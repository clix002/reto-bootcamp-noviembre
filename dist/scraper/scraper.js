"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsFromUrl = getProductsFromUrl;
const puppeteer_1 = __importDefault(require("puppeteer"));
async function getProductsFromUrl({ url }) {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    console.log(url);
    await page.goto(url, { waitUntil: "networkidle2" });
    // Esperamos a que los productos sean visibles
    await page.waitForSelector('.main.has-vitrine');
    const products = await page.evaluate(() => {
        const arrProductName = [];
        const arrProductPrice = [];
        // Extraemos los nombres de los productos
        document.querySelectorAll('a.Showcase__name').forEach((div) => {
            const productName = div.innerText.trim(); // Casting a HTMLElement
            arrProductName.push(productName);
        });
        // Extraemos los precios de los productos
        document.querySelectorAll('div.Showcase__priceBox__amount').forEach((div) => {
            const priceElement = div.querySelector('div.Showcase__salePrice');
            if (priceElement) {
                const price = priceElement.innerText.trim().slice(3); // Casting a HTMLElement
                arrProductPrice.push(price); // Eliminamos "S/"
            }
        });
        return { arrProductName, arrProductPrice };
    });
    await browser.close();
    return products;
}
