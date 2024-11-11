import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';

interface Product {
    name: string;
    price: string;
    quantity: string;
    unit: string;
}

function saveToCsv(products: Product[], category: string) {
    const dataDir = path.join(__dirname, '../../data');

    // Asegurarse de que la carpeta data existe
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const csvWriter = createObjectCsvWriter({
        path: path.join(dataDir, `${category}.csv`),
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

export { saveToCsv };
