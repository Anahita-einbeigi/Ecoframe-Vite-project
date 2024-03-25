<script setup>
import OurAdviceView from "./OurAdviceView.vue";
import SalesDisplay from "@/components/SalesDisplay.vue";
import ProductsOnSales from "@/components/ProductsOnSales.vue";
import { ref } from "vue";

import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();

const discount = ref(productStore.discount);
</script>

<template>
  <BContainer>
    <SalesDisplay :discount-to-display="discount" />
    <ProductsOnSales />
    <OurAdviceView />
  </BContainer>
</template>
