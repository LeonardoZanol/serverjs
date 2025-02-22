const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, "data", "products.json")
const app = express()
const port = 3000

app.use(cors(origin="*"))
app.use(express.json())

function loadProducts() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"))
}

function updateProducts(products) {
    fs.writeFileSync(filePath, JSON.stringify(products))
}

app.get('/produtos', (req, res) => {
    res.json(loadProducts())
})

app.get('/produtos/:id', (req, res) => {
    const products = loadProducts()
    res.json(products.find(usu => usu.id === parseInt(req.params.id)))
})

app.post('/produtos', (req, res) => {
    const products = loadProducts()
    const { nome, preco, secao } = req.body

    products.push({
        id: products.length ? products[products.length - 1].id + 1 : 1,
        nome,
        preco,
        secao
    })

    updateProducts(products)
    res.json(products)

})

app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta http://localhost:${port}`)
})