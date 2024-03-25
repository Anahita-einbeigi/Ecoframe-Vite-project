<script setup>
import { ref } from "vue";
import Cta from "@/components/Cta.vue";
import Categories from "../components/Categories.vue";
import OurAdviceView from "./OurAdviceView.vue";
import Icons from "@/components/Icons.vue";
import DisplayProductCategory from "@/components/DisplayProductCategory.vue";

import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();

const discount = ref(productStore.discount);
</script>

<template>
  <Cta :discount-to-display="discount" />
  <Icons />
  <DisplayProductCategory />
  <Categories category-to-display="Sunwear" />
  <Categories category-to-display="Popular" />
  <Categories category-to-display="New" />
  <OurAdviceView />
</template>
