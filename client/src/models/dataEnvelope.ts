/*  B"H
 */
export interface DataListEnvelope<T> {
  items: T[]
  total: number
  skip: number
  limit: number
}
