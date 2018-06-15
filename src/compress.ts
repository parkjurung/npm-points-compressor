import {Point} from './model';

export function numToString(num: number): string {
  if (!num) {
    return String.fromCharCode(0, 0);
  }
  const fixedNum = num.toFixed(4);
  const splitted = fixedNum.split('.').map(x => parseInt(x));
  
  if (splitted.length === 1) {
    splitted.push(0);
  }
  return String.fromCharCode(...splitted);
}
export function stringToNum(str: string): number {
  if (str.length === 2) {
    const left = str.charCodeAt(0) + '';
    let right = str.charCodeAt(1) + '';
    while (right.length < 4) {
      right = '0' + right;
    }
    return parseFloat(`${left}.${right}`);
  } else {
    console.error('the string must have')
  }
}
export function compress(points: Point[], axes?: string[]): string {
  const _axes = axes || Object.keys(points[0]);
  const prefix = _axes.toString() + '/';
  let data = '';
  points.forEach(point => {
    _axes.forEach(axis => {
      data = data + numToString(point[axis]);
    })
  });
  return prefix + data;
}

export function decompress(str: string): Point[] {
  const points = [];
  const delimPosition = str.indexOf('/');
  if (delimPosition < 0) {
    console.error('Invalid input');
    return null;
  }
  const axes = str.substring(0, delimPosition).split(',');
  const data = str.substring(delimPosition + 1);
  if (data.length % (axes.length * 2) !== 0) {
    console.error('Invalid data length')
  }
  for (let i = 0; i < data.length; i += axes.length * 2) {
    const point = {};
    for (let j = 0; j < axes.length; j ++) {
      point[axes[j]] = stringToNum(data.substr(i + j * 2, 2));
    }
    points.push(point);
  }
  return points;
}