<template>
  <div id="app">
    <div class="display">
      <product-list class="product-list-box" />
      <shopping-cart class="shopping-cart-box" />
    </div>
    
  </div>
</template>

<script>
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'

export default {
  name: 'app',
  components: {
    ProductList,
    ShoppingCart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.display {
  display: flex;
  align-items: top;
  justify-content: center;
}

.product-list-box {
  padding: 20px 20px;
}
.shopping-cart-box {
  border: solid 1px black;
  border-radius: 4px;
  padding: 20px 20px;
  margin-left: 50px;
}
</style>
