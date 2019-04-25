# umgfinder
[![NPM version](https://img.shields.io/npm/v/@hg8496/umgfinder.svg)](https://www.npmjs.com/package/@hg8496/umgfinder)
[![Build Status](https://travis-ci.org/hg8496/umgfinder.svg?branch=master)](https://travis-ci.org/hg8496/umgfinder)

A node js library to find all ethernet based Janitza UMGs in the specified network.

```typescript
import { scanNetwork } from '@hg8496/umgfinder';

async function main() {
    return await scanNetwork(process.argv[2]);
}

main().then((devices) => {
    console.log(devices);
});
```
