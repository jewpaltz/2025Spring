/* B"H
 */

import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  gender: string
  birthDate: Date
  image: string
  university: string
  role: string
}

export function getAll(): Promise<DataListEnvelope<User>> {
  return api('users')
}

export function get(id: number): Promise<User> {
  return api(`users/${id}`)
}

export function serchUser(
  search: string,
  page: number,
  limit: number,
): Promise<DataListEnvelope<User>> {
  return api(`users/search/${search}?page=${page}&limit=${limit}`)
}
