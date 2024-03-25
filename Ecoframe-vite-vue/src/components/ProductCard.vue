<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

const productId = computed(() => route.params.productId);
const product = ref(productStore.getProductById(productId.value));

const productPrice = computed(() => {
  if (product.value && product.value.onSale) {
    return productStore.updateProductSalesPrice(product.value.id);
  }
  return product.value.price;
});
</script>

<template>
  <BContainer
    class="mt-5 mb-5 custom-height d-flex flex-column justify-content-center align-items-center"
    fluid
  >
    <BRow>
      <BCol sm="12" md="6" class="columns">
        <img src="../assets/sunwear.png" alt="Image" />
      </BCol>
      <BCol sm="12" md="6" class="columns p-5">
        <BRow class="product-info">
          <h2>{{ product.modelName }}</h2>
          <h5>{{ product.brand }}</h5>
          <h2 v-if="product" :class="{ 'sales-color': product.onSale }">
            {{ productPrice }} SEK
          </h2>
          <h4 v-if="product.onSale" :class="{ 'old-price': product.onSale }">
            {{ product.price }} SEK
          </h4>
          <h5>
            Color:
            <span :style="{ color: product.color }">{{ product.color }}</span>
          </h5>
          <p>{{ product.description }}</p>
        </BRow>
        <BButton
          @click.prevent="productStore.addToCart(product)"
          variant="primary"
          >Add To Cart</BButton
        >
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
.custom-height {
  min-height: 60vh;
}
.sales-color {
  color: red;
}

span {
  font-weight: bold;
}

.old-price {
  text-decoration: line-through;
  font-weight: 300;
}

.container {
  min-height: 100vh;
}
</style>
