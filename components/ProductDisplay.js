app.component('product-display', {
  template: `
    <div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :class="{ 'out-of-stock-img': !inStock }" :src="image" alt="">
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p>{{ sale }}</p>
          <p v-if="inStock">In stock</p>
          <p v-else>Out of stock</p>
          <p>Shipping: {{ shipping }}</p>
          <product-details :details="details"></product-details>
          <div 
            v-for="(variant, index) in variants"
            :key="variant.id" 
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }"
          >
          </div>
          <button
            class="button" 
            :class="{ disabledButton: !inStock }" 
            @click="addToCart"
            :disabled="!inStock"
          >
            Add to cart
          </button>

          <button
            class="button" 
            :class="{ disabledButton: !inStock }" 
            @click="removeFromCart"
            :disabled="!inStock"
          >
            Remove Item
          </button>
        </div>
      </div>
      <review-form @review-sumbitted="addReview"></review-form>
      <review-list :reviews="reviews"></review-list>
    </div>
  `,

  data() {
    return {
      brand: 'vue3soko',
      selectedVariant: 0,
      product: 'Socks',
      details: [
        '50% Cotton',
        '30% Wool',
        '20% Polyester',
      ],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50, },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0, },
      ],
      reviews: [],
      onSale: true,
    };
  },

  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },

    image() {
      return this.variants[this.selectedVariant].image;
    },

    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },

    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' is on sale.'
      }
      return null
    },

    shipping() {
      if(this.premium) {
        return 'Free';
      }
      return 2.99;
    },
  },

  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
    },

    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
    },

    updateVariant(index) {
      this.selectedVariant = index;
    },

    addReview(review) {
      this.reviews.push(review);
    },
  }
});
