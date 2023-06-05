import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
const manager = new ProductManager("Archivo")

app.get('/products',async (req,res) =>{
    let limit = Number(req.query.limit)

    if (!limit) res.send(await manager.getProducts())
    else{
        let prods = []
        for(let i = 1; i < limit + 1; i++){
            if(await manager.getProductById(i)) prods.push(await manager.getProductById(i))
        }
        res.send(prods)
    } 
})
app.get('/products/:pid',async(req,res) =>{
    let id = Number(req.params.pid)
    let producto = await manager.getProductById(id)
    if (producto) res.send(producto)
    else res.send("Not Found")
})



app.listen(8080, ()=> console.log("Server Arriba"))