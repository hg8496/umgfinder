# umgfinder
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
