#!/usr/bin/env node
import { IDevice, scanNetwork } from "./index";

if (!process.argv[2]) {
    // tslint:disable:no-console
    console.log(`Usage: umgfinder <NETWORK>
    <NETWORK> can be specified as
        192.168.7
        192.168.7.0/24
        192.167.7.123/24
        192.168.0.0/26`);
    process.exit(2);
}

async function main(): Promise<IDevice[]> {
    return await scanNetwork(process.argv[2]);
}

main().then((devices) => {
    devices.forEach((device) => {
        // tslint:disable:no-console
        console.log(device.ip, device.serialNumber, device.deviceType, device.firmwareVersion);
    });
});
