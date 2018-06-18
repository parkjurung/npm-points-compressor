# npm points-compressor

## Install
```
$ npm install points-compressor
```
## Usage
### in javascript
```javascript
const ptComp = require('points-compressor');

const points = [
  {x: 123.123, y: 321.021, z: 1132.0001},
  {x: 163.222, y: 325.322, z: 1135.0201}
]
const compressed = ptComp.compress(points);
const decompressed = ptComp.decompress(compressed);
// R.equals(points, decompressed) must be true
// R means ramdajs
```
### in typescript
```typescript
import {compress, decompress} from 'points-compressor';

const points: Point[] = [
  {x: 123.123, y: 321.021, z: 1132.0001},
  {x: 163.222, y: 325.322, z: 1135.0201}
]
const compressed: string = compress(points);
const decompressed: Point[] = decompress(compressed);
// R.equals(points, decompressed) must be true
// R means ramdajs
```
## limitation
- **left of decimal must be smaller than 65535**
- **the length of right of decimal must be shorter than 5**
- `453.44`, `65000.4444`, `1.0123` ok
- `77777.1`, `123.22223` not ok

### Why?
- In my case, this limitation is enough to represent all data
- And it is very easy to implement the functions with such limitations.
- **But if you want to exceed such limitation, please let me know by leaving issue on the Github repo.**

## Compression performance
- **10% ~ 15%**
- **4.6kb to 0.6kb**
- check by running `npm run test`

## Introduction
In many case of javascript applications, it is common to send arbitrary data using JSON.stringify.  
And it is often inefficient to stringify a data which contains numbers.

For example

```javascript
let num = 5555.555;
```
The variable above occupies at most 4byte in memory.

```javascript
let num2 = '5555.555';
```
But `num2` occupies at least 16bytes(8 characters, 2bytes each character).

In my case, there are many `number`s in message packet. So it is necessary to compress that kind of packets.

### Point
```typescript
interface Point {
  [axis: string]: number
}
```
```javascript
let point1 = {'x': 111.234, 'y': 1455.01, 'z': 1993.134};
```

## Interfaces
### compress
```typescript
(points: Point[], axes?: string[]) => string;
```
### decompress
```typescript
(compressed: string) => Point[];
```

