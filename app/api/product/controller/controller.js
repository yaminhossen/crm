const db = require('../../index')

// const db = db

// create main model 
const Product = db.products
const Review = db.reviews

// main works

// 1. create product

const store = async (req, res) => {

    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info)
    res.status(200).send(product)

}

// 2. get all products

const All = async (req, res) => {
    
    let products = await Product.findAll({})
    res.status(200).send(products)
}

// 3. get single product

const get = async (req, res) => {
    
    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).send(product)
}

// 4. update products

const  Update = async (req, res) => {
    
    let id = req.params.id
    const product = await Product.update(req.body, { where: { id: id }})
    res.status(200).send(product)
}

// 5. delete product

const destroy = async (req, res) => {
    
    let id = req.params.id
    await Product.destroy({ where: { id: id }})
    res.status(200).send('Product is deleted !')
}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products = await Product.findAll({ where: { published: true }})
    res.status(200).send(products)
}

// 7. connect one to many relation Product and reviews

const getProductReviews = async (req, res) => {
    
    const data = await Product.findAll({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: 2 }
    })
    res.status(200).send(data)
}

module.exports = {
    store,
    All,
    get,
    Update,
    destroy,
    getPublishedProduct,
    getProductReviews
}