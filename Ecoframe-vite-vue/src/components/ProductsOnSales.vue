<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import { ref } from "vue";
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();

const productOnSale = ref(productStore.getProductsOnSale());
console.log(productOnSale.value);

const goToProductPage = (productId) => {
  console.log(productId);
  router.push({ name: "ProductPage", params: { productId } });
};

const toggleFavorite = (productId) => {
  productStore.toggleFavorite(productId);
};

const isFavorite = (productId) => {
  return productStore.isFavorite(productId);
};
</script>

<template>
  <BContainer fluid>
    <BRow>
      <BCol
        md="4"
        v-for="product in productOnSale"
        :key="product.id"
        class="mt-5 d-flex justify-content-center"
      >
        <BCard
          class="rounded-0 mb-5 hover"
          border-variant="light"
          tag="products"
          style="max-width: 20rem"
        >
          <router-link
            @click.prevent="goToProductPage(product.id)"
            to="/product/:id"
          >
            <img
              :src="'/src/assets/sunwear.png'"
              class="card-img-top"
              :alt="product.modelName"
            />
          </router-link>
          <BCardTitle class="card-items-padding card-first-item">{{
            product.modelName
          }}</BCardTitle>
          <BCardText class="card-items-padding"> {{ product.brand }}</BCardText>
          <BCardText class="onsale-color mb-1 card-items-padding">
            {{ productStore.updateProductSalesPrice(product.id) }} SEK
          </BCardText>
          <BCardText class="custom-font-style card-items-padding">
            {{ product.price }} SEK
          </BCardText>
          <BCardText class="card-items-padding"
            >Color: {{ product.color }}</BCardText
          >
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
.custom-font-style {
  text-decoration: line-through;
  font-weight: 200;
  color: #6c757d;
}

.onsale-color {
  color: #de3d4c;
  font-weight: 600;
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
