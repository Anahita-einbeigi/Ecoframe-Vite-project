<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
//filter
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();

onMounted(() => {
  productStore.initializeOriginalProducts();
});
</script>

<template>
  <main>
    <Header />
    <Navbar />
    <RouterView />
    <Footer />
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  min-height: 100vh;
  max-width: 1300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
}
</style>
