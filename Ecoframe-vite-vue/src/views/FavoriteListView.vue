<script setup>
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();
import sunwearImage from "@/assets/sunwear.png";
const router = useRouter();

let favorites = [];

watchEffect(() => {
  favorites = productStore.getFavoriteListFromSession();
});

const goToProductPage = (productId) => {
  router.push({ name: "ProductPage", params: { productId } });
};

const toggleFavorite = (productId) => {
  productStore.toggleFavorite(productId);
};

const productPrice = (product) => {
  if (product.value && product.onSale) {
    return productStore.updateProductSalesPrice(product.id);
  }
  return product.price;
};
</script>

<template>
  <BContainer fluid class="custom-height">
    <h2 class="text-center mt-5 mb-5">Favorites</h2>
    <h6 v-if="!favorites.length" class="text-center mt-2">
      You have no articles on your favorites list
    </h6>
    <BRow class="mb-5 pb-5">
      <BCol
        class="d-flex justify-content-center"
        cols="6"
        md="4"
        v-for="favorite in favorites"
        :key="favorite.id"
      >
        <BCard
          class="rounded-0 mb-5 hover"
          border-variant="light"
          img-top
          tag="product"
          style="max-width: 20rem"
        >
          <router-link
            @click.prevent="goToProductPage(favorite.id)"
            to="/product/:id"
          >
            <img
              :src="'/src/assets/sunwear.png'"
              class="card-img-top"
              :alt="favorite.modelName"
            />
          </router-link>
          <BCardTitle class="card-items-padding card-first-item">{{
            favorite.modelName
          }}</BCardTitle>
          <BCardText class="mb-1 custom-font-style card-items-padding">
            {{ favorite.brand }}</BCardText
          >
          <BCol class="d-flex gap-5">
            <BCardText
              v-if="favorites"
              :class="{ 'sales-color': favorite.onSale }"
              class="card-items-padding"
            >
              {{ productPrice(favorite) }} SEK
            </BCardText>
            <BCardText
              v-if="favorite.onSale"
              :class="{ 'old-price': favorite.onSale }"
              class="card-items-padding"
            >
              {{ favorite.price }} SEK
            </BCardText>
          </BCol>
          <BCardText class="card-items-padding">
            Color:
            <span :style="{ color: favorite.color }">{{ favorite.color }}</span>
          </BCardText>
          <router-link
            @click.prevent="goToProductPage(favorite.id)"
            to="/product/:id"
            class="text-primary card-items-padding"
            style="text-decoration: underline"
            >See Details</router-link
          >
          <BRow class="mt-4 d-flex justify-content-between">
            <BCol>
              <BButton
                @click.prevent="toggleFavorite(favorite.id)"
                variant="outline-danger"
                class="mt-2"
                >Remove</BButton
              >
            </BCol>
            <BCol>
              <BButton
                @click.prevent="productStore.addToCart(favorite)"
                class="mt-2"
                variant="primary"
                >Add to cart</BButton
              >
            </BCol>
          </BRow>
        </BCard>
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

.hover {
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
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
