const UNITS_OF_MEASUREMENT = ['un', 'g', 'kg', 'ml', 'l'];

function splitNameQuantity(rawName: string): [string, string] {
    const arrName = rawName.split(' ').slice(0, -1);
    const quantity = rawName.split(' ').pop() || '1';
    return [arrName.join(' '), quantity];
}

interface Product {
    name: string;
    price: string;
    quantity: string;
    unit: string;
}

export function preprocessProducts(productsName: string[], productsPrice: string[]): Product[] {
    const arrProducts: Product[] = [];
    const minLength = Math.min(productsName.length, productsPrice.length);

    for (let i = 0; i < minLength; i++) {
        let name = productsName[i];
        let quantity = '1';
        let ending = 'un';

        const wordEnding1 = name.slice(-1).toLowerCase();
        const wordEnding2 = name.slice(-2).toLowerCase();

        if (UNITS_OF_MEASUREMENT.includes(wordEnding2)) {
            name = name.slice(0, -2);
            quantity = name.split(' ').pop() || '1'; // Extract last word as quantity
            ending = wordEnding2;
        } else if (UNITS_OF_MEASUREMENT.includes(wordEnding1)) {
            name = name.slice(0, -1);
            quantity = name.split(' ').pop() || '1';
            ending = wordEnding1;
        }

        if (/^\d+(\.\d+)?$/.test(quantity)) {
            arrProducts.push({
                name,
                price: productsPrice[i],
                quantity,
                unit: ending,
            });
        } else {
            console.log('Quantity is NaN for:', name);
        }
    }

    return arrProducts;
}

