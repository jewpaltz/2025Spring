/* B"H
 */
import { ref } from 'vue'
import { addNotification } from './notifications'
import type { Product } from './products'

export interface CartItem {
  product: Product
  quantity: number
}

const cart = ref<CartItem[]>([])

export function refCart() {
  return cart
}

export function addToCart(product: Product, quantity: number = 1) {
  const item = cart.value.find((item) => item.product.id === product.id)
  if (item) {
    item.quantity += quantity
    addNotification({
      message: 'Item already in cart. Quantity updated.',
      type: 'info',
    })
  } else {
    cart.value.push({ product, quantity })
    addNotification({
      message: `Added ${quantity} ${product.title} to cart`,
      type: 'success',
    })
  }
}
