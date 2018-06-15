import {numToString, stringToNum} from './src';

const testNumbers = [123.0011, 4141.1044, 1923.3, 13444.0003];

testNumbers.forEach(num => {
  console.log('original', num);
  const numToStringResult = numToString(num);
  console.log('numToStringResult', numToStringResult);
  const stringToNumResult = stringToNum(numToStringResult);
  console.log('stringToNumResult', stringToNumResult);
});

export * from './src';