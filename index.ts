import { scanNetwork, IDevice }from './lib';

async function main() {
    const devices: IDevice[] = await scanNetwork(process.argv[2]);
    console.log(devices[0]);
    return devices;
}

main().then((devices) => {
    console.log(devices);
});
