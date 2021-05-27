/**
 * Mocking client-server processing
 */
const _products = [
    { 'id': 1, 'title': 'iPad 4 Mini', 'price': 669, 'inventory': 2, 'color': 'black', 'img': '' },
    { 'id': 2, 'title': 'AirPods Max White', 'price': 629, 'inventory': 10, 'img': 'src/assets/airpods-max-hero-select-202011_FMT_WHH.jpeg' },
    { 'id': 3, 'title': 'Iphone 12 Pro', 'price': 1159, 'inventory': 5, 'img': '' }
  ]
  
  export default {
    getProducts (cb) {
      setTimeout(() => cb(_products), 100)
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.webdriver)
          ? cb()
          : errorCb()
      }, 100)
    }
  }