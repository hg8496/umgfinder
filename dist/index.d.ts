export interface IDevice {
    manufacturer: string;
    deviceType: string;
    firmware: string;
    serialNumber: string;
    deviceName: string;
    ip: string;
}
export declare function scanNetwork(networkBlock: any): Promise<IDevice[]>;
