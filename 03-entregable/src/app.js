const express = require('express');
const PORT = 3000;
const app = express();

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

const productos = require('../../02-entregable/products.json');

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('¡Bienvenidos a mi servidor con Express!');
});

app.get('/products', (req, res) => {
    let resultado = productos;
    if (req.query.limit) {
        resultado = resultado.slice(0, req.query.limit);
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ filtros: req.query, resultado });
});


app.get('/products/:pid',(req,res)=>{

    let id=req.params.id
    id=parseInt(id)  
    if(isNaN(id)){
        return res.send('Error, ingrese un argumento id numerico')
    }


    resultado=productos.find(per=>per.id===id)

    res.setHeader('Content-Type','application/json');
    res.status(200).json({resultado});
})
