# umgfinder
A node js library to find all ethernet based Janitza UMGs in the specified network.

```typescript
import { scanNetwork, IDevice }from './lib';

async function main() {
    const devices: IDevice[] = await scanNetwork(process.argv[2]);
    console.log(devices[0]);
    return devices;
}

main().then((devices) => {
    console.log(devices);
});
```
