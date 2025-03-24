/*  B"H
*/

const express = require('express')
const router = express.Router()

router
    .get('/', (req, res) => {

        res.send([{
            id: 1,
            name: 'Product 1',
            price: 10.99
        },
        {
            id: 2,
            name: 'Product 2',
            price: 20.99
        },
        {
            id: 3,
            name: 'Product 3',
            price: 30.99
        }])
    })
    .get('/:id', (req, res) => {
        const { id } = req.params

        res.send({
            id,
            name: `Product ${id}`,
            price: 10.99 * id
        })
    })
    .post('/', (req, res) => {
        const { name, price } = req.body

        res.send({
            id: 4,
            name,
            price
        })
    })
    .patch('/:id', (req, res) => {
        const { id } = req.params
        const { name, price } = req.body

        res.send({
            id,
            name,
            price
        })
    })
    .delete('/:id', (req, res) => {
        const { id } = req.params

        res.send({
            message: `Product ${id} deleted`
        })
    })

module.exports = router