const ProductManager = require("./ProductManager")
const express = require("express")


const port = 3000
const app = express()
const manager = new ProductManager()

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})

app.get("/products", async (req, res) => {

    try {
        const products = await manager.getProducts()

        const { limit } = req.query
        if (limit){
            const productFilter = products.slice(0, req.query.limit)
            return res.json({message: productFilter})
        }

        res.json({message: products})
    } catch (error){}
})

app.get("/products/:pid", async (req, res)=>{
    try {
        const {pid} = req.params
        const product = await manager.getProductById(parseInt(pid))
        return res.json({product})
    } catch (error) {
        
    }
})


