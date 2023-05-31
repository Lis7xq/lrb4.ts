"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function runSequent(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var results, i, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    results = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[i], i)];
                case 2:
                    result = _a.sent();
                    results.push(result);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var array, results;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    array = ["one", "two", "three"];
                    return [4 /*yield*/, runSequent(array, function (item, index) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, Promise.resolve({
                                        item: item,
                                        index: index,
                                    })];
                            });
                        }); })];
                case 1:
                    results = _a.sent();
                    console.log(results);
                    return [2 /*return*/];
            }
        });
    });
}
main();
//2
function arrayChangeDelete(array, rule) {
    var deletedElements = [];
    for (var i = array.length - 1; i >= 0; i--) {
        if (rule(array[i])) {
            var deletedElement = array.splice(i, 1)[0];
            deletedElements.unshift(deletedElement);
        }
    }
    return deletedElements;
}
var array = [1, 2, 3, 6, 7, 9];
var deletedElements = arrayChangeDelete(array, function (item) { return item % 2 === 0; });
console.log(array);
console.log(deletedElements);
//3
var fs_1 = require("fs");
var path_1 = require("path");
var axios_1 = require("axios");
function saveHTMLContent(link, folderPath) {
    return __awaiter(this, void 0, void 0, function () {
        var response, htmlContent, fileName, filePath, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get(link)];
                case 1:
                    response = _a.sent();
                    htmlContent = response.data;
                    fileName = link.replace(/[^a-zA-Z0-9]/g, "_") + ".html";
                    filePath = path_1.default.join(folderPath, fileName);
                    fs_1.default.writeFileSync(filePath, htmlContent);
                    console.log("Saved HTML content for ".concat(link));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching ".concat(link, ": ").concat(error_1.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createPagesFolder(jsonFilePath) {
    var folderName = path_1.default.basename(jsonFilePath, ".json");
    var folderPath = "".concat(folderName, "_pages");
    if (!fs_1.default.existsSync(folderPath)) {
        fs_1.default.mkdirSync(folderPath);
    }
    return folderPath;
}
function parseJSONFile(jsonFilePath) {
    var jsonContent = fs_1.default.readFileSync(jsonFilePath, "utf-8");
    var links = JSON.parse(jsonContent);
    var folderPath = createPagesFolder(jsonFilePath);
    for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
        var link = links_1[_i];
        saveHTMLContent(link, folderPath);
    }
}
// Отримуємо шлях до JSON-файла з аргументів командного рядка
var jsonFilePath = process.argv[2];
if (!jsonFilePath) {
    console.error("Потрібно вказати шлях до JSON-файла");
}
else {
    parseJSONFile(jsonFilePath);
}
//4
var os_1 = require("os");
var systeminformation_1 = require("systeminformation");
var battery_level_1 = require("battery-level");
function getSystemInformation() {
    var osInfo = {
        operatingSystem: os_1.default.platform(),
        architecture: os_1.default.arch(),
        currentUser: os_1.default.userInfo().username,
    };
    console.log("Operating System:", osInfo.operatingSystem);
    console.log("Architecture:", osInfo.architecture);
    console.log("Current User:", osInfo.currentUser);
    systeminformation_1.default.cpu()
        .then(function (cpuData) {
        console.log("CPU Cores Models:");
        cpuData.cores.forEach(function (core) {
            console.log("-", core.model);
        });
    })
        .catch(function (error) {
        console.error("Error fetching CPU information:", error.message);
    });
    systeminformation_1.default.cpuTemperature()
        .then(function (temperatureData) {
        console.log("CPU Temperature:", temperatureData.main);
    })
        .catch(function (error) {
        console.error("Error fetching CPU temperature:", error.message);
    });
    systeminformation_1.default.graphics()
        .then(function (graphicsData) {
        console.log("Graphic Controllers Vendors and Models:");
        graphicsData.controllers.forEach(function (controller) {
            console.log("-", controller.vendor, controller.model);
        });
    })
        .catch(function (error) {
        console.error("Error fetching graphic controllers information:", error.message);
    });
    systeminformation_1.default.mem()
        .then(function (memoryData) {
        console.log("Total Memory:", "".concat((memoryData.total / 1024 / 1024 / 1024).toFixed(2), " GB"));
        console.log("Used Memory:", "".concat((memoryData.used / 1024 / 1024 / 1024).toFixed(2), " GB"));
        console.log("Free Memory:", "".concat((memoryData.free / 1024 / 1024 / 1024).toFixed(2), " GB"));
    })
        .catch(function (error) {
        console.error("Error fetching memory information:", error.message);
    });
    (0, battery_level_1.default)()
        .then(function (batteryPercent) {
        console.log("Battery Charging:", os_1.default.type() === "Windows"
            ? "N/A"
            : os_1.default.type() === "Darwin"
                ? "N/A"
                : os_1.default.type() === "Linux"
                    ? "N/A"
                    : "Unknown");
        console.log("Battery Percentage:", "".concat((batteryPercent * 100).toFixed(2), "%"));
        console.log("Battery Remaining Time:", "N/A");
    })
        .catch(function (error) {
        console.error("Error fetching battery information:", error.message);
    });
}
// Отримуємо частоту в секундах з аргументів командного рядка
var frequencyInSeconds = parseInt(process.argv[2]);
if (!frequencyInSeconds || isNaN(frequencyInSeconds)) {
    console.error("Потрібно вказати числовий параметр - частоту в секундах");
}
else {
    // Виводимо інформацію на кожному тику з вказаною частотою
    setInterval(getSystemInformation, frequencyInSeconds * 1000);
}
var MyEventEmitter = /** @class */ (function () {
    function MyEventEmitter() {
        this.eventHandlers = {};
    }
    MyEventEmitter.prototype.registerHandler = function (eventName, handler) {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    };
    MyEventEmitter.prototype.emitEvent = function (eventName) {
        var handlers = this.eventHandlers[eventName];
        if (handlers) {
            handlers.forEach(function (handler) {
                handler();
            });
        }
    };
    return MyEventEmitter;
}());
// Приклад використання
var emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", function () {
    return console.log("Обліковий запис користувача оновлено");
});
emitter.emitEvent("userUpdated"); // Обліковий запис користувача оновлено
