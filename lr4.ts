//1
export {};

async function runSequent<T, R>(
  array: T[],
  callback: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i);
    results.push(result);
  }

  return results;
}

async function main() {
  const array: string[] = ["one", "two", "three"];
  const results = await runSequent(array, async (item, index) =>
    Promise.resolve({
      item,
      index,
    })
  );

  console.log(results);
}

main();

//2

function arrayChangeDelete<T>(array: T[], rule: (item: T) => boolean): T[] {
  const deletedElements: T[] = [];

  for (let i = array.length - 1; i >= 0; i--) {
    if (rule(array[i])) {
      const deletedElement = array.splice(i, 1)[0];
      deletedElements.unshift(deletedElement);
    }
  }

  return deletedElements;
}

const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

console.log(array);
console.log(deletedElements);

//3

import fs from "fs";
import path from "path";
import axios from "axios";

async function saveHTMLContent(link: string, folderPath: string) {
  try {
    const response = await axios.get(link);
    const htmlContent = response.data;
    const fileName = link.replace(/[^a-zA-Z0-9]/g, "_") + ".html";
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, htmlContent);
    console.log(`Saved HTML content for ${link}`);
  } catch (error) {
    console.error(`Error fetching ${link}: ${error.message}`);
  }
}

function createPagesFolder(jsonFilePath: string) {
  const folderName = path.basename(jsonFilePath, ".json");
  const folderPath = `${folderName}_pages`;

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  return folderPath;
}

function parseJSONFile(jsonFilePath: string) {
  const jsonContent = fs.readFileSync(jsonFilePath, "utf-8");
  const links = JSON.parse(jsonContent);

  const folderPath = createPagesFolder(jsonFilePath);

  for (const link of links) {
    saveHTMLContent(link, folderPath);
  }
}

// Отримуємо шлях до JSON-файла з аргументів командного рядка
const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.error("Потрібно вказати шлях до JSON-файла");
} else {
  parseJSONFile(jsonFilePath);
}

//4
import os from "os";
import si from "systeminformation";
import batteryLevel from "battery-level";

function getSystemInformation() {
  const osInfo = {
    operatingSystem: os.platform(),
    architecture: os.arch(),
    currentUser: os.userInfo().username,
  };

  console.log("Operating System:", osInfo.operatingSystem);
  console.log("Architecture:", osInfo.architecture);
  console.log("Current User:", osInfo.currentUser);

  si.cpu()
    .then((cpuData) => {
      console.log("CPU Cores Models:");
      cpuData.cores.forEach((core) => {
        console.log("-", core.model);
      });
    })
    .catch((error) => {
      console.error("Error fetching CPU information:", error.message);
    });

  si.cpuTemperature()
    .then((temperatureData) => {
      console.log("CPU Temperature:", temperatureData.main);
    })
    .catch((error) => {
      console.error("Error fetching CPU temperature:", error.message);
    });

  si.graphics()
    .then((graphicsData) => {
      console.log("Graphic Controllers Vendors and Models:");
      graphicsData.controllers.forEach((controller) => {
        console.log("-", controller.vendor, controller.model);
      });
    })
    .catch((error) => {
      console.error(
        "Error fetching graphic controllers information:",
        error.message
      );
    });

  si.mem()
    .then((memoryData) => {
      console.log(
        "Total Memory:",
        `${(memoryData.total / 1024 / 1024 / 1024).toFixed(2)} GB`
      );
      console.log(
        "Used Memory:",
        `${(memoryData.used / 1024 / 1024 / 1024).toFixed(2)} GB`
      );
      console.log(
        "Free Memory:",
        `${(memoryData.free / 1024 / 1024 / 1024).toFixed(2)} GB`
      );
    })
    .catch((error) => {
      console.error("Error fetching memory information:", error.message);
    });

  batteryLevel()
    .then((batteryPercent) => {
      console.log(
        "Battery Charging:",
        os.type() === "Windows"
          ? "N/A"
          : os.type() === "Darwin"
          ? "N/A"
          : os.type() === "Linux"
          ? "N/A"
          : "Unknown"
      );
      console.log(
        "Battery Percentage:",
        `${(batteryPercent * 100).toFixed(2)}%`
      );
      console.log("Battery Remaining Time:", "N/A");
    })
    .catch((error) => {
      console.error("Error fetching battery information:", error.message);
    });
}

// Отримуємо частоту в секундах з аргументів командного рядка
const frequencyInSeconds = parseInt(process.argv[2]);

if (!frequencyInSeconds || isNaN(frequencyInSeconds)) {
  console.error("Потрібно вказати числовий параметр - частоту в секундах");
} else {
  // Виводимо інформацію на кожному тику з вказаною частотою
  setInterval(getSystemInformation, frequencyInSeconds * 1000);
}
///node systemInfo.ts 5
//У цьому прикладі системна інформація буде оновлюватись кожні 5 секунд

//5
type EventHandler = () => void;

class MyEventEmitter {
  private eventHandlers: { [eventName: string]: EventHandler[] };

  constructor() {
    this.eventHandlers = {};
  }

  registerHandler(eventName: string, handler: EventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(handler);
  }

  emitEvent(eventName: string): void {
    const handlers = this.eventHandlers[eventName];

    if (handlers) {
      handlers.forEach((handler) => {
        handler();
      });
    }
  }
}

// Приклад використання

const emitter = new MyEventEmitter();

emitter.registerHandler("userUpdated", () =>
  console.log("Обліковий запис користувача оновлено")
);

emitter.emitEvent("userUpdated"); // Обліковий запис користувача оновлено
