<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="">
        <ul v-else>
            <li 
              v-for="(product, index) in products" 
              :key="index">{{product.title}} - {{product.price | currency}} {{product.inventory}}
              <button 
                :disabled="!productIsInStock(product)"
                @click="addProductToCart(product)">Add to cart</button>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
    data () {
        return {
            loading: false,
            productIndex: 1
        }
        
    },
    methods: {
        ...mapActions({
            fetchProducts: 'products/fetchProducts',
            addProductToCart: 'cart/addProductToCart'
        })
        // addProductToCart (product) {
        //     this.$store.dispatch('addProductToCart', product)
        // }
    },
    computed: {
        ...mapState({
            products: state => state.products.items
        }),
        ...mapGetters('products', {
            productIsInStock: 'productIsInStock'
        })
        // products() {
        // //    return this.$store.getters.availableProducts
        //     return this.$store.state.products
        // },
        // productIsInStock () {
        //     return this.$store.getters.productIsInStock
        // }
    },
    created () {
        this.loading = true
        this.fetchProducts()
          .then(() => this.loading = false)
    }

}
</script>