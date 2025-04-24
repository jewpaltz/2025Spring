/* B"H
 */

import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'
import type { User } from './users'

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
