# umgfinder
[![NPM version](https://img.shields.io/npm/v/@hg8496/umgfinder.svg)](https://www.npmjs.com/package/@hg8496/umgfinder)
[![Build Status](https://travis-ci.org/hg8496/umgfinder.svg?branch=master)](https://travis-ci.org/hg8496/umgfinder)
[![Coverage Status](https://coveralls.io/repos/github/hg8496/umgfinder/badge.svg?branch=master)](https://coveralls.io/github/hg8496/umgfinder?branch=master)

A node js library to find all ethernet based Janitza UMGs in the specified network.

```typescript
import { scanNetwork } from '@hg8496/umgfinder';

async function main() {
    return await scanNetwork(process.argv[2]);
}

main().then((devices) => {
    devices.forEach((device) => {
        console.log(device.deviceType, device.ip, device.serialNumber, device.firmwareVersion)
    })
});
```
