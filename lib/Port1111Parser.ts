import IDevice from "./IDevice";

export default function parse(info: string, ipAddress: string): IDevice {
    const [manufacturer, deviceType, firmwareRaw, , serialNumberRaw, , deviceName] = info.split(",");
    return {
        deviceName: removeZeros(deviceName || ""),
        deviceType: removeZeros(deviceType || ""),
        firmwareVersion: extractFirmwareVersion(removeZeros(firmwareRaw || "")),
        ip: ipAddress,
        manufacturer: removeZeros(manufacturer),
        serialNumber: extractSerialNumber(removeZeros(serialNumberRaw || "")),
    };
}

function removeZeros(value: string): string {
    return value.replace(/\0/g, "").trim();
}

function extractSerialNumber(serialRaw: string): string {
    let result: string = serialRaw;
    if (serialRaw.length === 8) {
        result = serialRaw.substr(0, 4) + ":" + serialRaw.substr(4);
    }
    return result;
}

function extractFirmwareVersion(firmwareRaw: string) {
    return firmwareRaw.replace("Release = ", "");
}
