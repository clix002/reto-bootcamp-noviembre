"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = require("./config/categories");
const preprocessProducts_1 = require("./helpers/preprocessProducts");
const saveToCsv_1 = require("./helpers/saveToCsv");
const scraper_1 = require("./scraper/scraper");
async function productsToCsv({ category }) {
    const url = `https://plazavea.com.pe/${category}`;
    const { arrProductName, arrProductPrice } = await (0, scraper_1.getProductsFromUrl)({ url });
    const products = (0, preprocessProducts_1.preprocessProducts)(arrProductName, arrProductPrice);
    console.log(products);
    (0, saveToCsv_1.saveToCsv)(products, category);
}
async function main() {
    for (let category of categories_1.categories) {
        console.log(`Processing category: ${category}`);
        await productsToCsv({ category });
    }
}
main();
