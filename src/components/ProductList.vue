<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="">
        <ul v-else>
            <li 
              v-for="(product, index) in products" :key="index">{{product.title}} - {{product.price | currency}} {{product.inventory}}
              <button @click="addProductToCart(product)">Add to cart</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            loading: false
        }
        
    },
    methods: {
        addProductToCart (product) {
            this.$store.dispatch('addProductToCart', product)
        }
    },
    computed: {
        products() {
           return this.$store.getters.availableProducts
        }
    },
    created () {
        this.loading = true
        this.$store.dispatch('fetchProducts')
          .then(() => this.loading = false)
    }

}
</script>