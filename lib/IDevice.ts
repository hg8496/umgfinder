export default interface IDevice {
    manufacturer: string;
    deviceType: string;
    firmwareVersion?: string;
    serialNumber: string;
    deviceName: string;
    ip?: string;
}
