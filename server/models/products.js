/*  B"H
*/

const data = require('../data/products.json')
const { CustomError, statusCodes } = require('./errors')
const { connect } = require('./supabase')

const TABLE_NAME = 'products'

const BaseQuery = () => connect().from(TABLE_NAME)
    .select('*, product_reviews(average_rating:rating.avg())')
    //.select('*')

const isAdmin = true;

async function getAll() {
    const list = await BaseQuery()
    if(list.error){
        throw list.error
    }
    return {
        items: list.data,
        total: list.count
    }
}

async function get(id){
    const { data: item, error } = await connect().from(TABLE_NAME)
    .select('*, product_reviews(*)').eq('id', id)
    if (!item.length) {
        throw new CustomError('Item not found', statusCodes.NOT_FOUND)
    }
    if (error) {
        throw error
    }
    return item
}

async function search(query){
    const { data: items, error } = await BaseQuery()
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    if (error) {
        throw error
    }
    return items
} 

async function create(item){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to create a new item", statusCodes.UNAUTHORIZED)
    }
    const { data: newItem, error } = await connect().from(TABLE_NAME).insert(item).select('*')
    if (error) {
        throw error
    }
    return newItem
}

async function update(id, item){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to update this item", statusCodes.UNAUTHORIZED)
    }
    const { data: updatedItem, error } = await connect().from(TABLE_NAME).update(item).eq('id', id).select('*')
    if (error) {
        throw error
    }
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
    return deletedItem
}

async function seed(){
    for (const item of data.items) {

        const insert = mapToDB(item)
        const { data: newItem, error } = await connect().from(TABLE_NAME).insert(insert).select('*')
        if (error) {
            throw error
        }

        for (const review of item.reviews) {
            const reviewInsert = mapReviewToDB(review, newItem[0].id)

            const { data: newReview, error } = await connect().from('product_reviews').insert(reviewInsert).select('*')

            if (error) {
                throw error
            }
        }

    }
    return { message: 'Seeded successfully' }
}

function mapToDB(item) {
    return {
        //id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        price: item.price,
        rating: item.rating,
        stock: item.stock,
        tags: item.tags,
        brand: item.brand,
        sku: item.sku,
        weight: item.weight,
        dimensions: item.dimensions,
        shipping_information: item.shippingInformation,
        availability_status: item.availabilityStatus,
        return_policy: item.returnPolicy,
        minimum_order_quantity: item.minimumOrderQuantity
    }
}

function mapReviewToDB(review, product_id) {
    return {
        product_id: product_id,
        rating: review.rating,
        comment: review.comment,
        reviewer_email: review.reviewerEmail,
        reviewer_name: review.reviewerName,
        date: review.date,
    }
}

module.exports = {
    getAll,
    get,
    search,
    create,
    update,
    remove,
    seed,
}