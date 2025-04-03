/*  B"H
*/

const data = require('../data/products.json')
const { CustomError, statusCodes } = require('./errors')

const isAdmin = true;

async function getAll() {
    return data
}

async function get(id){
    const item = data.items.find((item) => item.id == id)
    if (!item) {
        throw new CustomError('Item not found', statusCodes.NOT_FOUND)
    }
    return item
}

async function create(item){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to create a new item", statusCodes.UNAUTHORIZED)
    }
    const newItem = {
        id: data.items.length + 1,
        ...item
    }
    data.items.push(newItem)
    return newItem
}

async function update(id, item){
    const index = data.items.findIndex((item) => item.id == id)
    if (index === -1) {
        return null
    }
    const updatedItem = {
        ...data.items[index],
        ...item
    }
    data.items[index] = updatedItem
    return updatedItem

}

async function remove(id){
    const index = data.items.findIndex((item) => item.id == id)
    if (index === -1) {
        return null
    }
    const deletedItem = data.items[index]
    data.items.splice(index, 1)
    return deletedItem
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove
}