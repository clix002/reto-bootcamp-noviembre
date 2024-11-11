"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToCsv = saveToCsv;
const csv_writer_1 = require("csv-writer");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function saveToCsv(products, category) {
    const dataDir = path_1.default.join(__dirname, '../../data');
    // Asegurarse de que la carpeta data existe
    if (!fs_1.default.existsSync(dataDir)) {
        fs_1.default.mkdirSync(dataDir, { recursive: true });
    }
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
        path: path_1.default.join(dataDir, `${category}.csv`),
        header: [
            { id: 'name', title: 'Name' },
            { id: 'price', title: 'Price' },
            { id: 'quantity', title: 'Quantity' },
            { id: 'unit', title: 'Unit' },
        ],
    });
    csvWriter
        .writeRecords(products)
        .then(() => console.log(`CSV file for ${category} has been written successfully.`))
        .catch((err) => console.error('Error writing CSV file:', err));
}
