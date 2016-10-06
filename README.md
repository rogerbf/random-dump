# random-dump

Source random data from `/dev/random`.

## usage

### node

``` javascript
import random from 'random-dump'

const readableStream = random(1)
readableStream.pipe(process.stdout)
// writes 1 random byte to stdout

random(10, (err, buff) => {
  // buff is Buffer of 10 random bytes
})
```

### cli

#### installation

```
npm i -g random-dump
```

#### usage

Dump 10 bytes of random data to stdout:

```
random-dump 10
```

Dump 1mb of data to a file:

```
random-dump 1mb randomdump.file
```
