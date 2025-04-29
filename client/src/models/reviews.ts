/* B"H
 */

import type { DataListEnvelope } from './dataEnvelopes'
import type { ProductReview } from './products'
import { api } from './session'

export function getAll() {
  return api<DataListEnvelope<ProductReview>>('reviews')
}

export function getOne(id: string) {
  return api<ProductReview>(`reviews/${id}`)
}

export function create(data: ProductReview) {
  return api<ProductReview>('reviews', data)
}

export function update(id: number, data: ProductReview) {
  return api<ProductReview>(`reviews/${id}`, data, 'PATCH')
}

export function remove(id: number) {
  return api<ProductReview>(`reviews/${id}`, undefined, 'DELETE')
}
