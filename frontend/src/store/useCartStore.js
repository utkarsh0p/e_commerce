import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
	cart: [],
	coupon: null,
	total: 0,
	subtotal: 0,
	isCouponApplied: false,
	loading: false,

	getCartItems: async () => {
		try {
			set({ loading: true });
			const response = await axios.get("/api/cart");
			set({ cart: response.data.cartItems || [], loading: false });
			get().calculateTotals();
		} catch (error) {
			set({ cart: [], loading: false });
			// Only show error if it's not an authentication error
			if (error.response?.status !== 401) {
				toast.error(error.response?.data?.message || "Failed to fetch cart");
			}
		}
	},
	clearCart: () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},
	
	clearAllCart: async () => {
		try {
			set({ cart: [], total: 0, subtotal: 0 });
			await axios.delete("/api/cart");
			toast.success("Cart cleared");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to clear cart");
			// Refetch to sync with server
			get().getCartItems();
		}
	},
	addToCart: async (productId) => {
		try {
			set({ loading: true });
			await axios.post("/api/cart", { productId });
			toast.success("Product added to cart");
			await get().getCartItems();
			set({ loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "Failed to add to cart");
		}
	},
	removeFromCart: async (productId) => {
		const previousCart = get().cart;
		try {
			// Optimistic update
			set((state) => ({ cart: state.cart.filter((item) => item._id !== productId) }));
			get().calculateTotals();
			
			await axios.delete(`/api/cart`, { data: { productId } });
			toast.success("Item removed from cart");
		} catch (error) {
			// Rollback on error
			set({ cart: previousCart });
			get().calculateTotals();
			toast.error(error.response?.data?.message || "Failed to remove item");
		}
	},
	updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		const previousCart = get().cart;
		try {
			// Optimistic update
			set((state) => ({
				cart: state.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
			}));
			get().calculateTotals();
			
			await axios.put(`/api/cart/${productId}`, { quantity });
		} catch (error) {
			// Rollback on error
			set({ cart: previousCart });
			get().calculateTotals();
			toast.error(error.response?.data?.message || "Failed to update quantity");
		}
	},
	
	calculateTotals: () => {
		const { cart, coupon } = get();
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		let total = subtotal;
		
		if (coupon) {
			const discount = subtotal * (coupon.discountPercentage / 100);
			total = subtotal - discount;
		}
		
		set({ subtotal, total });
	},
}));
