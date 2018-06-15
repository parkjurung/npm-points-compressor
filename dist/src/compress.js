"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function numToString(num) {
    if (!num) {
        return String.fromCharCode(0, 0);
    }
    var fixedNum = num.toFixed(4);
    var splitted = fixedNum.split('.').map(function (x) { return parseInt(x); });
    if (splitted.length === 1) {
        splitted.push(0);
    }
    return String.fromCharCode.apply(String, splitted);
}
exports.numToString = numToString;
function stringToNum(str) {
    if (str.length === 2) {
        var left = str.charCodeAt(0) + '';
        var right = str.charCodeAt(1) + '';
        while (right.length < 4) {
            right = '0' + right;
        }
        return parseFloat(left + "." + right);
    }
    else {
        console.error('the string must have');
    }
}
exports.stringToNum = stringToNum;
function compress(points, axes) {
    var _axes = axes || Object.keys(points[0]);
    var prefix = _axes.toString() + '/';
    var data = '';
    points.forEach(function (point) {
        _axes.forEach(function (axis) {
            data = data + numToString(point[axis]);
        });
    });
    return prefix + data;
}
exports.compress = compress;
function decompress(str) {
    var points = [];
    var delimPosition = str.indexOf('/');
    if (delimPosition < 0) {
        console.error('Invalid input');
        return null;
    }
    var axes = str.substring(0, delimPosition).split(',');
    var data = str.substring(delimPosition + 1);
    if (data.length % (axes.length * 2) !== 0) {
        console.error('Invalid data length');
    }
    for (var i = 0; i < data.length; i += axes.length * 2) {
        var point = {};
        for (var j = 0; j < axes.length; j++) {
            point[axes[j]] = stringToNum(data.substr(i + j * 2, 2));
        }
        points.push(point);
    }
    return points;
}
exports.decompress = decompress;
//# sourceMappingURL=compress.js.map