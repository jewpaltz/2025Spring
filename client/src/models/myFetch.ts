/* B"H
 */

export const API_ROOT = (import.meta.env.VITE_API_ROOT as string) ?? '/api/v1/'

export function rest<T>(
  url: string,
  data?: any,
  method?: string,
  headers?: HeadersInit,
): Promise<T> {
  return fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((x) => x.json())
}

export function api<T>(
  action: string,
  data?: any,
  method?: string,
  headers?: HeadersInit,
): Promise<T> {
  return rest<T>(`${API_ROOT}${action}`, data, method, headers)
}
