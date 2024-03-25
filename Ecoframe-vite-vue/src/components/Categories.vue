<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useProductStore } from "../stores/productStore";
const router = useRouter();
const productStore = useProductStore();

const props = defineProps({
  categoryToDisplay: String,
});

const categoryToDisplay = ref(
  productStore.getCategory(props.categoryToDisplay)
);

const goToProductPage = (productId) => {
  console.log(productId);
  router.push({ name: "ProductPage", params: { productId } });
};

const goToAllProductPage = (category) => {
  router.push({ name: "Shop", params: { category } });
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

console.log(categoryToDisplay.value);
</script>

<template>
  <BContainer fluid>
    <h2 class="text-center my-4 text-primary">{{ props.categoryToDisplay }}</h2>
    <BRow>
      <BCol
        col="6"
        md="3"
        v-for="category in categoryToDisplay"
        :key="category.id"
      >
        <BCard
          class="rounded-0 position-relative hover"
          border-variant="light"
          tag="products"
          style="max-width: 20rem"
        >
          <router-link
            @click.prevent="goToProductPage(category.id)"
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
            {{ category.brand }}</BCardText
          >
          <BCardText
            v-if="categoryToDisplay"
            :class="{ 'sales-color': category.onSale }"
            class="card-items-padding"
          >
            {{ productPrice(category) }} SEK
          </BCardText>
          <BCardText
            v-if="category.onSale"
            :class="{ 'old-price': category.onSale }"
            class="card-items-padding"
          >
            {{ category.price }} SEK
          </BCardText>
          <BCol
            class="d-flex justify-content-between card-items-padding card-bottom-item"
          >
            <router-link
              @click.prevent="goToProductPage(category.id)"
              to="/product/:id"
              class="text-primary"
              style="text-decoration: underline"
              >See Details</router-link
            >

            <i
              @click.prevent="toggleFavorite(category.id)"
              class="bi bi-heart icon-large custom"
              :class="
                isFavorite(category.id) ? 'text-danger' : 'text-secondary'
              "
            ></i>
          </BCol>
        </BCard>
      </BCol>
    </BRow>
    <BCol class="d-flex justify-content-center m-4">
      <BButton
        @click.prevent="goToAllProductPage(props.categoryToDisplay)"
        to="/shop"
        variant="primary"
        >See all</BButton
      >
    </BCol>
  </BContainer>
</template>

<style lang="scss" scoped>
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

.sales-color {
  color: red;
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
