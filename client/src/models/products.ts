/* B"H
 */

import { ref } from 'vue'
import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'
import type { User } from './users'
import { API_ROOT } from './myFetch'

export interface ProductDimensions {
  width: number
  height: number
  depth: number
}

export interface ProductReview {
  id: number
  product_id: number
  reviewer_id: number
  rating: number
  comment: string
  date: string
  //reviewerName: string
  //reviewerEmail: string

  product?: Product
  reviewer?: User
}

export interface ProductMeta {
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  //rating?: number
  stock?: number
  tags?: string[]
  brand?: string
  sku?: string
  weight?: number
  dimensions?: ProductDimensions
  shippingInformation?: string
  availabilityStatus?: string
  reviews?: ProductReview[]
  returnPolicy?: string
  minimumOrderQuantity?: number
  meta?: ProductMeta
  images?: string[]
  thumbnail?: string
}

export function getAll() {
  return api<DataListEnvelope<Product>>('products')
}

export function getOne(id: string) {
  return api<Product>(`products/${id}`)
}

export function search(query: string, limit = 10, offset = 0) {
  return api<DataListEnvelope<Product>>(`products/search/${query}?offset=${offset}&limit=${limit}`)
}

export function useProductEventSource(id: number) {
  const events = ref<MessageEvent[]>([])
  const product = ref<Product | null>(null)

  const eventSource = new EventSource(`${API_ROOT}products/${id}`)

  eventSource.addEventListener('product', (event) => {
    const data = JSON.parse(event.data)
    product.value = data
    console.log('product from raw event', data)
  })

  eventSource.addEventListener('reviews.new', (event) => {
    const data = JSON.parse(event.data)
    if (product.value) {
      product.value.reviews = product.value.reviews || []
      product.value.reviews.push(data)
    }
  })

  eventSource.addEventListener('error', (event) => {
    console.error('Error from raw event', event)
  })

  return { events, product }
}
