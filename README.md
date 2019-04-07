# umgfinder
A node js library to find all Janitza UMGs in the specified network.

```javascript
const scanNetwork = require('@hg8496/umgfinder').scanNetwork;

async function main() {
    return await scanNetwork('192.168.178.0/24');
}

main().then((asdf) => {
    console.log(asdf)
});
```
