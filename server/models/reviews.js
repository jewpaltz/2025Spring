/*  B"H
*/

// I took out a reference to the json. Because the only use for it is to seed the database. and reviews are seeded along with products
const { CustomError, statusCodes } = require('./errors')
const { connect } = require('./supabase')
const { EventEmitter } = require('events')

const TABLE_NAME = 'product_reviews'

const BaseQuery = () => connect().from(TABLE_NAME)
    // You've always got to make sure that you are accessing related tables that exist in the database
    // in this case I'm actually doing something unique. I usually do not access entire related tables from a list query
    // but in this case I know that there will only be one product and one reviewer for each review
    .select('*, product: products(*), reviewer:users(*)', { count: "estimated" })

const isAdmin = true;

const event_bus = new EventEmitter()


async function getAll(limit = 30, offset = 0, sort = 'id', order = 'desc'){
    const list = await BaseQuery()
    .order(sort, { ascending: order === 'asc' })
    .range(offset, offset + limit - 1) // 0 based index but range is inclusive
    if(list.error){
        throw list.error
    }
    return {
        items: list.data,
        total: list.count
    }
}

async function get(id){
    console.log('Getting item with id:', id)
    const { data: item, error } = await connect().from(TABLE_NAME)
    // Whenever we get a review, we usually want to know who wrote it and what product it is for
    .select('*, product:products(*), reviewer:users(*)').eq('id', id)
    if (!item) {
        throw new CustomError('Item not found', statusCodes.NOT_FOUND)
    }
    if (error) {
        throw error
    }
    return item[0]
}

async function search(query, limit = 30, offset = 0, sort = 'id', order = 'desc'){
    const { data: items, error, count } = await BaseQuery()
    .or(`comment.ilike.%${query}%`)
    .order(sort, { ascending: order === 'asc' })
    .range(offset, offset + limit -1)
    if (error) {
        throw error
    }
    return {
        items,
        total: count
    }
} 

async function create(item){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to create a new item", statusCodes.UNAUTHORIZED)
    }
    const { data, error } = await connect().from(TABLE_NAME).insert(item).select('id')

    if (error) {
        throw error
    }
    const newItem = await get(data[0].id)
    event_bus.emit('reviews.new', newItem)
    return newItem
}

async function update(id, item){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to update this item", statusCodes.UNAUTHORIZED)
    }
    const { error } = await connect().from(TABLE_NAME).update(item).eq('id', id).select('id')
    if (error) {
        throw error
    }
    const updatedItem = await get(id)
    return updatedItem
}

async function remove(id){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to delete this item", statusCodes.UNAUTHORIZED)
    }
    const { data: deletedItem, error } = await connect().from(TABLE_NAME).delete().eq('id', id)
    if (error) {
        throw error
    }
    return {
        message: `Deleted review #${id} successfully`,
        status: statusCodes.OK,
    }
}

// We are seeding reviews in the products model. So this is not needed here

module.exports = {
    getAll,
    get,
    search,
    create,
    update,
    remove,
    event_bus,
}