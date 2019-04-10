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
            manufacturer: removeZeros(manufacturer),
            devicetype: removeZeros(devicetype),
            firmware: removeZeros(firmwareraw).substr(10),
            serialnumber: extractSerialnumber(removeZeros(serialnumberraw)),
            devicename: removeZeros(devicename),
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
    }
    await sleep(5000);
    server.close();
    return devices;
};

function removeZeros(string) {
    let result = "";
    if(typeof string === 'string') {
        result = string.replace(/\0/g, '');
    }
    return result;
}

function extractSerialnumber(serialraw) {
    let result = '';
    if(typeof serialraw === 'string') {
        result = serialraw;
        if(serialraw.length === 8) {
            result = serialraw.substr(0, 4) + ':' + serialraw.substr(4)
        }
    }
    return result;
}