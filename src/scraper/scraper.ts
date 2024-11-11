import puppeteer from "puppeteer";

type Prop = {
    url: string;
};

export async function getProductsFromUrl({ url }: Prop) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(url)
    await page.goto(url, { waitUntil: "networkidle2" });

    // Esperamos a que los productos sean visibles
    await page.waitForSelector('.main.has-vitrine');
    const products = await page.evaluate(() => {
        const arrProductName: string[] = [];
        const arrProductPrice:string[] = [];
    
        // Extraemos los nombres de los productos
        document.querySelectorAll('a.Showcase__name').forEach((div) => {
            const productName = (div as HTMLElement).innerText.trim(); // Casting a HTMLElement
            arrProductName.push(productName);
        });
    
        // Extraemos los precios de los productos
        document.querySelectorAll('div.Showcase__priceBox__amount').forEach((div) => {
            const priceElement = div.querySelector('div.Showcase__salePrice');
            if (priceElement) {
                const price = (priceElement as HTMLElement).innerText.trim().slice(3); // Casting a HTMLElement
                arrProductPrice.push(price); // Eliminamos "S/"
            }
        });
    
        return { arrProductName, arrProductPrice };
    });
    
    

    await browser.close();

    return products;
}
