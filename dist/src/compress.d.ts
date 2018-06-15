import { Point } from './model';
export declare function numToString(num: number): string;
export declare function stringToNum(str: string): number;
export declare function compress(points: Point[], axes?: string[]): string;
export declare function decompress(str: string): Point[];
