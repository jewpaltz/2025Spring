/*  B"H
 */
import { ref } from 'vue'
import * as myFetch from './myFetch'
import { get, type User } from './users'

export function api<T>(
  action: string,
  data?: any,
  method?: string,
  headers?: HeadersInit,
): Promise<T> {
  return myFetch.api<T>(action, data, method, headers)
}

const session = ref({
  user: null as User | null,
  token: null as string | null,
})

export function refSession() {
  return session
}

export const isAdmin = () => session.value?.user?.role === 'admin'

export const isLoggedIn = () => session.value?.user !== null

export function login(id: number) {
  return get(id).then((user) => {
    session.value.user = user
  })
}
export function logout() {
  session.value.user = null
  session.value.token = null
}

export async function googleLogin() {
  await myFetch.loadScript('https://accounts.google.com/gsi/client')

  //const google = (window as any).google
  const oAuthClient = google?.accounts?.oauth2?.initTokenClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',

    callback: async (response) => {
      if (response.error) {
        console.error('Error during Google login:', response.error_description)
        return
      }
      const token = response.access_token
      session.value.token = token

      const userInfo = await googleFetch<any>('https://www.googleapis.com/oauth2/v3/userinfo')
      console.log('User info:', userInfo)

      session.value.user = {
        id: userInfo.sub,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        email: userInfo.email,
        image: userInfo.picture,
        role: 'user',
      } as User
    },
  })

  oAuthClient.requestAccessToken()
}

export async function googleFetch<T>(
  url: string,
  data?: any,
  method?: string,
  headers?: HeadersInit,
): Promise<T> {
  if (!session.value.token) {
    throw new Error('Not logged in')
  }
  return myFetch.rest<T>(url, data, method, {
    Authorization: `Bearer ${session.value.token}`,
    ...headers,
  })
}
