/* B"H
 */

export const API_ROOT = (import.meta.env.VITE_API_ROOT as string) ?? '/api/v1/'

export function rest<T>(url: string): Promise<T> {
  return fetch(url).then((x) => x.json())
}

export function api<T>(action: string): Promise<T> {
  return rest<T>(`${API_ROOT}${action}`)
}
