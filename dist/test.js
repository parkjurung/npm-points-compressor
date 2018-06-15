"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("./src");
var ramda_1 = require("ramda");
// test configs
var testAxes = ['x', 'y', 'z'];
var testPointsLength = 100;
var testTimes = 10000;
// ----
function generateRandomNumber() {
    return Math.floor(Math.random() * 65000 * 10000) / 10000;
}
function generateRandomTestCases(axes, num) {
    var points = [];
    var _loop_1 = function (i) {
        var point = {};
        axes.forEach(function (axis) {
            point[axis] = generateRandomNumber();
        });
        points.push(point);
    };
    for (var i = 0; i < num; i++) {
        _loop_1(i);
    }
    return points;
}
function runTest(num) {
    for (var i = 0; i < num; i++) {
        var theCase = generateRandomTestCases(testAxes, testPointsLength);
        var compressed = src_1.compress(theCase);
        var decompressed = src_1.decompress(compressed);
        var jsonFromOriginal = JSON.stringify(theCase);
        var jsonFromCompressed = JSON.stringify(compressed);
        var equality = ramda_1.equals(theCase, decompressed);
        if (i % 100 === 0) {
            console.log("test<" + i + ">");
            console.log("equality", equality);
            console.log("originalSize: " + jsonFromOriginal.length + " / compressedSize: " + jsonFromCompressed.length);
            console.log("ratio: " + jsonFromCompressed.length / jsonFromOriginal.length);
            console.log('------------------------');
        }
        else {
            // do not logging for performance
        }
        if (!equality) {
            console.error('Inequality occurs!!');
            console.log('trouble maker:', theCase);
            break;
        }
    }
}
runTest(testTimes);
//# sourceMappingURL=test.js.map