import IDevice from "./IDevice";

export default function parse(info: string, ipAddress: string) : IDevice {
    const [manufacturer, deviceType, firmwareRaw, , serialNumberRaw, , deviceName] = info.split(",");
    return {
        deviceName: removeZeros(deviceName),
        deviceType: removeZeros(deviceType),
        firmwareVersion: removeZeros(firmwareRaw).substr(10),
        ip: ipAddress,
        manufacturer: removeZeros(manufacturer),
        serialNumber: extractSerialNumber(removeZeros(serialNumberRaw)),
    };
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