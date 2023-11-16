const fs = require('fs');

class ProductManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    writeProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    }

    addProduct(title, description, price, thumbnail, stock) {
        let code = 1;
        if (this.products.length > 0) {
            code = this.products[this.products.length - 1].code + 1;
        }
        let newProduct = {
            code,
            title,
            description,
            price,
            thumbnail,
            stock,
        };
        this.products.push(newProduct);
        this.writeProducts();
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.code === id);
        if (index !== -1) {
            this.products[index] = updatedProduct;
            this.writeProducts();
            return true; 
        }
        return false; 
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.code === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.writeProducts();
            return true; 
        }
        return false;
    }

    getProductById(id) {
        return this.products.find(product => product.code === id);
    }

    getProducts() {
        return this.products;
    }
}

module.exports = ProductManager;

let productManager = new ProductManager('./products.json');
productManager.addProduct(`Gallo Oro`, `Arroz Fino`, `$500`, `Sin Imagen`, `20`);
productManager.addProduct(`Amanda`, `Arroz`, `$400`, `Sin Imagen`, `10`);
productManager.writeProducts(this.path, this.products)

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));
console.log(productManager.getProductById(3));
