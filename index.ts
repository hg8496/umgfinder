import { scanNetwork }from './lib';

async function main() {
    return await scanNetwork(process.argv[2]);
}

main().then((devices) => {
    devices.forEach((device) => {
        console.log(device.deviceType, device.ip, device.serialNumber, device.firmwareVersion)
    })
});
