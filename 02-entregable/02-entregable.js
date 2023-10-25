const fs = require('fs') 
class ProductManager {

    //CADA CONSTRUCTOR CON SU CODE INICIAL EN 1
    constructor(rutaArchivo) {
        this.products = [];
        this.path=rutaArchivo
      
    }
    writeProducts(){
        fs.writeFileSync(this.path, this.products)
        let convertor=this.products
        if(Array.isArray(convertor)){
            convertor = JSON.stringify(this.products, null, "\t")
            return
        }
    }

    //UN METODO QUE TE RETORNE EL ARRAY DE PRODUCTOS
    getProducts() {
        return this.products;
    }
    //UN METODO QUE RECIBE LOS PARAMETROS PEDIDOS Y UN INCREMENTADOR POR CADA CODE 
    addProduct(title, description, price, thumbnail, stock) {
        
        let code=1 
        if (this.products.length > 0){
            code=this.products[this.products.length - 1].code + 1
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
    }
    //SE DECLARA UN METODO DONDE SE HACE UN FIND POR ID DE ITEM QUE RETORNE EL ARRAY DE UNO DE LOS PRODUCTOS EN EL CASO DE QUE EXISTA 
    getProductById(code){

        if(!this.products.find((products)=> products.code === code)){
        
        return `Not Found`
        
        }else{
        
        return this.products.find((products)=> products.code === code)
        
        }
        
        }
}
//DECLARO 2 PRODUCTOS Y LOS MUESTRO POR CONSOLA
let productManager = new ProductManager('./02/products.json');
productManager.addProduct(`Gallo Oro`, `Arroz Fino`, `$500`, `Sin Imagen`, `20`);
productManager.addProduct(`Amanda`, `Arroz`, `$400`, `Sin Imagen`, `10`);
productManager.writeProducts(this.path, this.products)



console.log(productManager.getProducts());


console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));
console.log(productManager.getProductById(3));






