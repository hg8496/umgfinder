import { Netmask } from "@hg8496/netmask";
import * as dgram from "dgram";

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface IDevice {
    manufacturer: string;
    deviceType: string;
    firmware: string;
    serialNumber: string;
    deviceName: string;
    ip: string;
}

export async function scanNetwork(networkBlock: any): Promise<IDevice[]> {
    const devices: IDevice[] = [];
    const server = dgram.createSocket("udp4");

    server.on("error", err => {
        server.close();
    });

    server.on("message", (msg, rinfo) => {
        const [manufacturer, deviceType, firmwareRaw, , serialNumberRaw, , deviceName] = msg
            .toString("utf8")
            .split(",");
        const device: IDevice = {
            deviceName: removeZeros(deviceName),
            deviceType: removeZeros(deviceType),
            firmware: removeZeros(firmwareRaw).substr(10),
            ip: rinfo.address,
            manufacturer: removeZeros(manufacturer),
            serialNumber: extractSerialNumber(removeZeros(serialNumberRaw)),
        };
        devices.push(device);
    });

    server.bind();
    const block = new Netmask(networkBlock);
    const iterator = block.iterateHosts();
    for (const ip of iterator) {
        server.send("req", 1111, ip);
        await sleep(20);
    }
    await sleep(5000);
    server.close();
    return devices;
}

function removeZeros(value: string): string {
    return value.replace(/\0/g, "");
}

function extractSerialNumber(serialRaw: string): string {
    let result: string = serialRaw;
    if (serialRaw.length === 8) {
        result = serialRaw.substr(0, 4) + ":" + serialRaw.substr(4);
    }
    return result;
}
