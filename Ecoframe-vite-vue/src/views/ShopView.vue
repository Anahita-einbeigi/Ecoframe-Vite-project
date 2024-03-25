<template>
  <div class="shop-view container">
    <Cta />
    <div class="row justify-content-center mt-5 mb-5"></div>
    <div class="row">
      <div class="col-lg-3">
        <Filter />
      </div>
      <div class="col-lg-9">
        <AllProducts />
      </div>
    </div>
  </div>
</template>

<script>
import Filter from "../components/Filter.vue";
import AllProducts from "../components/AllProducts.vue";

export default {
  components: {
    Filter,
    AllProducts,
  },
};
</script>
<style scoped>
@media (min-width: 992px) {
  .shop-view .row:first-child {
    flex-direction: column;
  }
}
</style>
