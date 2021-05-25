import shop from "@/api/shop";

export default {
    namespaced: true,
    state: {
        items: [], // it will hold {id, quantity}
        checkoutStatus: null
    },
    getters: {
        cartProducts (state, getters, rootState, rootGetters) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id )
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal (state, getters) {
            let total = 0
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })
            return total
        }
    },
    mutations: {
        pushProductToCart (state, productId) {
            state.items.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQuantity (state, cartItem) {
            cartItem.quantity++
        },
        setCheckoutStatus (state, status) {
            state.checkoutStatus = status
        },
        emptyCart (state) { // no need to any parameters
            state.items = []
        }
    },
    actions: {
        addProductToCart ({state, getters, commit, rootState, rootGetters}, product) { // destructuring from context
            if (rootGetters['products/productIsInStock'](product)) {
                // find cartItem
                const cartItem = state.items.find(item => item.id === product.id)
                if (!cartItem) {
                    // if item does not exist in the cart, push product to cart passing the product id
                    commit('pushProductToCart', product.id)
                } else {
                    // incrementItemQuantity if the product is in stock
                    commit('incrementItemQuantity', cartItem)
                }
                commit('products/decrementProductInventory', product, {root: true})
            }
        },
        checkout ({state, commit}) { // we are using here destructuring to grab state and commit from the context
            shop.buyProducts(
                state.items,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }
    }
}