import Netmask from "@hg8496/netmask";
import IDevice from './IDevice';
import parse from './Port1111Parser'
import * as dgram from "dgram";

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function scanNetwork(networkBlock: any): Promise<IDevice[]> {
    const devices: IDevice[] = [];
    const server = dgram.createSocket("udp4");

    server.on("error", err => {
        server.close();
    });

    server.on("message", (msg, rinfo) => {
        devices.push(parse(msg.toString("utf8"), rinfo.address));
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

export { IDevice }