"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const categories_1 = require("../config/categories");
const markdownFilePath = path_1.default.join(__dirname, '../../README.md');
let markdownContent = `# Plazavea Web Scrapping - CSV Files

Este archivo contiene enlaces a los archivos CSV generados para cada categoría.

\`\`\`bash
pnpm install
\`\`\`

## Usage

\`\`\`bash
pnpm run start
\`\`\`


## Opcional
\`\`\`bash
node .\src\helpers\generateCsvMarkdown.js
\`\`\`

## en la carpeta data 📁 se generará archivo.csv 
`;
// Itera sobre las categorías para generar contenido
categories_1.categories.forEach(category => {
    // Ruta del archivo CSV para la categoría
    const csvFilePath = path_1.default.join(__dirname, '../../data', `${category}.csv`);
    const csvLink = fs_1.default.existsSync(csvFilePath)
        ? `[${category}.csv](data/${category}.csv)` // Si el archivo existe, agrega el enlace
        : `No CSV available for ${category}`; // Si no existe, muestra un mensaje
    // Agrega la información de la categoría al contenido Markdown
    markdownContent += `#### ${category}\n${csvLink}\n\n`;
});
// Guarda el contenido en el archivo README.md
fs_1.default.writeFileSync(markdownFilePath, markdownContent, 'utf8');
console.log('README.md with CSV links has been generated.');
