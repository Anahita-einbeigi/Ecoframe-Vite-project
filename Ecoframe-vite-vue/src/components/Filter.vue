<template>
  <div class="container filter-wrapper">
    <button class="btn filter-btn" :class="  {'btn-light': !isMobileView, 'btn-dark': isMobileView}" @click="toggleShowFilters" :style="buttonStyle">
      Filters
    </button>

    <div v-show="showFilters" class="filter-content px-2 py-3">
      <div class="filter-title mb-4">
        <h2 class="text-primary">Filters</h2>
      </div>

      <!-- Kategorival -->
      <div class="mb-4">
        <select class="form-select mb-4" v-model="selectedCategory">
          <option value="" disabled selected>Select Category</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <!-- Brand filter -->
      <div class="card mb-4">
        <div class="card-header">Brand</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="brand in brands" :key="brand">
            <input type="radio" class="me-2"
            v-model="selectedBrands" :value="brand" :id="brand">
            <label :for="brand">{{ brand }}</label>
          </li>
        </ul>
      </div>

      <!-- Färgfilter -->
      <div class="card mb-4">
        <div class="card-header">Color</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="color in colors" :key="color">
            <input type="radio" class="me-2" v-model="selectedColor" :value="color" :id="color">
            <label :for="color">{{ color }}</label>
          </li>
        </ul>
      </div>

      <!-- Prisfilter -->
      <div class="card mb-4">
        <div class="card-header">Price</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="price in prices" :key="price">
            <input type="radio" class="me-2" v-model="selectedPrice" :value="price" :name="price"> {{ price }}
          </li>
        </ul>
      </div>

      <!-- Betygsfilter -->
      <div class="card mb-4">
        <div class="card-header">Rating</div>
        <div class="card-body">
          <div v-for="rating in ratings" :key="rating" class="mb-2">
            <input type="radio" class="me-2" v-model="selectedRating" :value="rating" :name="`rating-${rating}`">
            <span v-for="star in 5" :key="`star-${rating}-${star}`" class="star" :class="{ 'text-warning': star <= rating, 'text-secondary': star > rating }">★</span>
            {{ rating }}
          </div>
        </div>
      </div>

      <!-- knappar -->
      <div class="d-flex justify-content-between mb-4">
        <button class="btn btn-secondary me-3" v-if="showClearButton" @click="clearFilters">Clear Filters</button>
        <button class="btn btn-success" @click="applyFilters">Show Products</button>
      </div>
    </div>

    <!-- Antal matchande produkter -->
    <div v-if="filtersApplied">
      <div v-if="filteredProducts.length > 0">
        <h3>Matching Products: ({{ filteredProducts.length }})</h3>
      </div>
      <div v-else>
        <p style="margin-left: 20px; font-size: 22px;">No matching products found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, computed} from 'vue';
  import { useProductStore } from '@/stores/productStore';

  const store = useProductStore();
  const isMobileView = ref(window.innerWidth < 768);
  const showFilters = ref(!isMobileView.value);
  const selectedCategory = ref('');
  const selectedColor = ref('');
  const selectedPrice = ref('');
  const selectedRating = ref(0);
  const selectedBrands = ref([]);
  
  const isAnyFilterActive = computed(() => {
    return selectedCategory.value !== '' ||
           selectedColor.value !== '' ||
           selectedPrice.value !== '' ||
           selectedRating.value !== 0 ||
           selectedBrands.value.length > 0;
  });

  const filteredProducts = computed(() => store.filteredProducts);
  const filtersApplied = ref(false);

  const showClearButton = computed(() => {
    return isAnyFilterActive.value || filtersApplied.value;
  });

  const categories = computed(() => {
    console.log('Categories:', store.getCategories());
    return store.getCategories();
  });
  const colors = computed(() => ['Black', 'Brown', 'Light', 'Blue', 'Yellow', 'Red','Gold','Green','Grey']);
  const brands = computed(() => ['Rayban', 'Oakley', 'Gucci', 'Prada', 'Tom Ford', 'Versace']);
  const prices = computed(() => ['Under 1000 SEK', '1000 - 3000 SEK', 'Over 3000 SEK']);
  const ratings = computed(() => [5, 4, 3, 2, 1]);

  const applyFilters = () => {
    const filters = {
      category: selectedCategory.value || "All glasses",
      brands: selectedBrands.value,
      color: selectedColor.value,
      price: selectedPrice.value,
      rating: selectedRating.value,
    };
    store.applyFilters(filters);
    filtersApplied.value = true;

    // Nollställ valda värden för radio-knappar
    selectedColor.value = '';
    selectedPrice.value = '';
    selectedRating.value = 0;
    selectedBrands.value = [];
    };

  const clearFilters = () => {
    const currentCategory = selectedCategory.value;
    selectedCategory.value = '';
    selectedColor.value = '';
    selectedPrice.value = '';
    selectedRating.value = '';
    selectedBrands.value = [];
    filtersApplied.value = false;

    if (isMobileView.value) {
      showFilters.value = false;
    }
    // Laddar om sidan
    window.location.reload();
  };

  const toggleShowFilters = () => {
    showFilters.value = !showFilters.value;
  };

  watch(() => store.selectedCategory, (newVal) => {
    store.applyFilters({ category: newVal });
  });
</script>


<style scoped>
.card img {
  width: 100%;
  height: 80px;
}

.filter-wrapper {
  position: relative;
}

@media (min-width: 992px) {
  .filter-btn {
    display: none;
  }
}

@media (max-width: 991px) {
  .card img {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
  .filter-wrapper {
    width: 60%;
    margin: 10px;
    padding: 0;
  }
 .filter-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
    position: static !important;
    left: 10px !important;
    top: 10px !important;
    width: 100px !important;
    min-width: 100px !important;
    max-width: 100px !important;
    height: 40px !important;
    background-color: black !important;
    color: white !important;
    z-index: 100 !important;
    border: none !important;
    border-radius: 5px !important;
  }
  .btn {
    width: 150px;
  }
  .product-cards .card {
    margin-bottom: 15px;
  }
}
</style>
