<script setup>
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../stores/productStore";
import sunwearImage from "@/assets/sunwear.png";

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const category = computed(() => route.params.category);
const filteredProducts = computed(() => productStore.filteredProducts);

const products = computed(() => {
  return filteredProducts.value.length > 0
    ? filteredProducts.value
    : productStore.getCategory(category.value);
});

const goToProductPage = (productId) => {
  router.push({ name: "ProductPage", params: { productId } });
};

const toggleFavorite = (productId) => {
  productStore.toggleFavorite(productId);
};

const isFavorite = (productId) => {
  return productStore.isFavorite(productId);
};

const productPrice = (product) => {
  if (product.value && product.onSale) {
    return productStore.updateProductSalesPrice(product.id);
  }
  return product.price;
};
</script>

<template>
  <BContainer fluid>
    <h2 class="text-center my-4 text-primary">{{ category }}</h2>
    <div v-if="products.length === 0" class="text-center">
      <p>
        No products were found. Try another search or browse our categories.
      </p>
    </div>
    <BRow>
      <BCol cols="6" md="4" v-for="product in products" :key="product.id">
        <BCard
          class="rounded-0 hover"
          border-variant="light"
          img-top
          tag="product"
          style="max-width: 20rem"
        >
          <router-link
            @click.prevent="goToProductPage(product.id)"
            to="/product/:id"
          >
            <img
              :src="'/src/assets/sunwear.png'"
              class="card-img-top"
              :alt="category.modelName"
            />
          </router-link>
          <BCardTitle class="card-items-padding card-first-item">{{
            category.modelName
          }}</BCardTitle>
          <BCardText class="mb-1 custom-font-style card-items-padding">
            {{ product.brand }}</BCardText
          >
          <BCardText
            v-if="products"
            :class="{ 'sales-color': product.onSale }"
            class="card-items-padding"
          >
            {{ productPrice(product) }} SEK
          </BCardText>
          <BCardText
            v-if="product.onSale"
            :class="{ 'old-price': product.onSale }"
            class="card-items-padding"
          >
            {{ product.price }} SEK
          </BCardText>
          <BCol
            class="d-flex justify-content-between card-items-padding card-bottom-item"
          >
            <router-link
              @click.prevent="goToProductPage(product.id)"
              to="/product/:id"
              class="text-primary"
              style="text-decoration: underline"
              >See Details</router-link
            >
            <i
              @click.prevent="toggleFavorite(product.id)"
              class="bi bi-heart icon-large custom"
              :class="isFavorite(product.id) ? 'text-danger' : 'text-secondary'"
            ></i>
          </BCol>
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style lang="scss" scoped>
.sales-color {
  color: red;
}
.custom-font-style {
  font-weight: 200;
}

.custom {
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
}

.hover {
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}

.old-price {
  text-decoration: line-through;
  font-weight: 300;
}

.card {
  --bs-card-spacer-y: 0;
  --bs-card-spacer-x: 0;
}

.card-items-padding {
  padding-left: 1rem;
  padding-right: 1rem;
}

.card-first-item {
  padding-top: 1rem;
}

.card-bottom-item {
  padding-bottom: 1rem;
}
</style>
