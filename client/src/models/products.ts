/* B"H
 */
import type { DataListEnvelope } from './dataEnvelope'
import data from '../data/products.json'

export interface ProductDimensions {
  width: number
  height: number
  depth: number
}

export interface ProductReview {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface ProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface Product {
  id?: number
  title?: string
  description?: string
  category?: string
  price: number
  discountPercentage?: number
  rating?: number
  stock?: number
  tags?: string[]
  brand?: string
  sku?: string
  weight?: number
  dimensions?: ProductDimensions
  warrantyInformation?: string
  shippingInformation?: string
  availabilityStatus?: string
  reviews?: ProductReview[]
  returnPolicy?: string
  minimumOrderQuantity?: number
  meta?: ProductMeta
  images?: string[]
  thumbnail?: string
}

export function getProducts() {
  return data as DataListEnvelope<Product>
}

export function getProductById(id: number): Product | undefined {
  return data.items.find((product) => product.id === id)
}
