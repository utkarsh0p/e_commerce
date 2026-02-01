import React, { useEffect } from 'react'
import { useCartStore } from '../store/useCartStore.js'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { cart, loading, getCartItems, updateQuantity, removeFromCart, clearAllCart, subtotal, total } = useCartStore()

  useEffect(() => {
    getCartItems()
  }, [])

  const handleIncrement = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1)
  }

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1)
    } else {
      removeFromCart(productId)
    }
  }

  const handleRemove = (productId) => {
    removeFromCart(productId)
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearAllCart()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-tan">
        <p className="text-xl">Loading your cart...</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-tan px-4">
        <ShoppingBag size={80} className="opacity-50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-center opacity-70 mb-6">Add some products to get started!</p>
        <Link
          to="/"
          className="px-6 py-2 bg-tan text-oxford rounded-lg font-medium hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-tan px-4 sm:px-6 py-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm opacity-70 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-sm opacity-60 capitalize">
                      Category: {item.category}
                    </p>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-3">
                    <div className="text-xl font-bold">
                      ₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                        <button
                          onClick={() => handleDecrement(item._id, item.quantity)}
                          className="p-1.5 hover:bg-white/10 rounded transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item._id, item.quantity)}
                          className="p-1.5 hover:bg-white/10 rounded transition"
                          aria-label="Increase quantity"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-4">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-lg">
                <span className="opacity-70">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg">
                <span className="opacity-70">Shipping</span>
                <span className="font-semibold text-green-400">Free</span>
              </div>

              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-tan text-oxford rounded-lg font-semibold text-lg hover:opacity-90 transition">
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center mt-4 opacity-70 hover:opacity-100 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
