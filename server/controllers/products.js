/*  B"H
*/
const model = require('../models/products')
const express = require('express')
const router = express.Router()

router
    .get('/', (req, res, next) => {

        model.getAll().then((data) => {
            res.send(data)
        }).catch(next)

    })
    .get('/:id', (req, res, next) => {
        const { id } = req.params

        model.get(id).then((data) => {
            res.send(data)
        }).catch(next)

    })
    .post('/', (req, res, next) => {
        const newValues = req.body

        model.create(newValues).then((data) => {
            res.status(201).send(data)
        }).catch(next)

    })
    .patch('/:id', (req, res, next) => {
        const { id } = req.params
        const newValues = req.body

        model.update(id, newValues).then((data) => {
            res.send(data)
        }).catch(next)

    })
    .delete('/:id', (req, res, next) => {
        const { id } = req.params

        model.remove(id).then((data) => {
            res.send(data)
        }).catch(next)
    })

module.exports = router