const db = require('../../index')

// const db = db

// create main model 
const Product = db.customer_support_tickets

// main works

// 1. create product

const addProduct = async (req, res) => {

    let info = {
        customer_id: req.body.customer_id,
        ticket_uuid: req.body.ticket_uuid,
        subject: req.body.subject,
        description: req.body.description,
        priority: req.body.priority
    }

    const product = await Product.create(info)
    res.status(200).send(product)

}

// 2. get all products

const getAllProducts = async (req, res) => {
    
    let products = await Product.findAll({})
    res.status(200).send(products)
}

// 3. get single product

const getOneProduct = async (req, res) => {
    
    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).send(product)
}

// 4. update products

const UpdateProduct = async (req, res) => {
    
    let id = req.params.id
    const product = await Product.update(req.body, { where: { id: id }})
    res.status(200).send(product)
}

// 5. delete product

const deleteProduct = async (req, res) => {
    
    let id = req.params.id
    await Product.destroy({ where: { id: id }})
    res.status(200).send('Product is deleted !')
}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products = await Product.findAll({ where: { published: true }})
    res.status(200).send(products)
}



module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    UpdateProduct,
    deleteProduct,
    getPublishedProduct
}