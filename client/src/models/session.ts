/*  B"H
 */
import * as myFetch from './myFetch'

export function api<T>(action: string): Promise<T> {
  return myFetch.api<T>(action)
}
