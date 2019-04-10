const scanNetwork = require('./lib').scanNetwork;

async function main() {
    return await scanNetwork(process.argv[2]);
}

main().then((devices) => {
    console.log(devices);
});
