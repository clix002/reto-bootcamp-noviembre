import { categories, Category } from "./config/categories";
import { preprocessProducts } from "./helpers/preprocessProducts";
import { saveToCsv } from "./helpers/saveToCsv";
import { getProductsFromUrl } from "./scraper/scraper";

type Props = {
    category: Category;
};

async function productsToCsv({ category }: Props) {
    const url = `https://plazavea.com.pe/${category}`;
    const { arrProductName, arrProductPrice } = await getProductsFromUrl({ url }); 
    const products = preprocessProducts( arrProductName, arrProductPrice );
    console.log(products)
    saveToCsv(products, category );
}

async function main() {
    for (let category of categories) {
        console.log(`Processing category: ${category}`);
        await productsToCsv({ category });
    }
}

main();