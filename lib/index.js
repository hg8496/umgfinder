const Netmask = require('@hg8496/netmask').Netmask;
const dgram = require('dgram');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.scanNetwork = async function(networkBlock) {
    let devices = [];
    const server = dgram.createSocket('udp4');

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });

    server.on('message', (msg, rinfo) => {
        let [manufacturer, devicetype, firmwareraw, , serialnumberraw, , devicename] = msg.toString('utf8').split(',');
        let device = {
            manufacturer: manufacturer,
            devicetype: devicetype,
            firmware: firmwareraw.substr(10),
            serialnumber: serialnumberraw.substr(0, 4) + ':' + serialnumberraw.substr(4),
            devicename: devicename,
            ip: rinfo.address
        };
        devices.push(device);
    });

    server.bind();
// server listening 0.0.0.0:?
    const block = new Netmask(networkBlock);
    const iterator = block.networkIterator();
    for(const ip of iterator) {
        server.send("req", 1111, ip);
        await sleep(20)
    };
    await sleep(5000);
    server.close();
    return devices;
};

