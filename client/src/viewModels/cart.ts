/* B"H
 */
import { ref, computed } from 'vue'
import type { Product } from '../models/products'

export type CartItem = Product & { quantity: number }

const cart = ref<CartItem[]>([])

export function refCart() {
  return { cart, addToCart, removeFromCart, count, totalItems, totalPrice }
}

export function addToCart({ title, price }: Product) {
  cart.value.push({ title, price, quantity: 1 })
}

export function removeFromCart(index: number) {
  cart.value.splice(index, 1)
}

export const count = computed(() => {
  return cart.value.length
})

export const totalItems = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.quantity, 0)
})

export const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
})
