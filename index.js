const scanNetwork = require('./lib').scanNetwork;

async function main() {
//const block = new Netmask('195.145.150.160/28');
    return await scanNetwork('192.168.178.0/24');
}

main().then((asdf) => {
    console.log(asdf)
});