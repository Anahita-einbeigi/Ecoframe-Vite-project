<template>
  <div class="image-container">
    <div class="image-with-overlay">
      <img src="@/assets/man-sunglasses.jpg" alt="Man with sunglasses" />
      <div class="overlay">
        <h2 class="text">Sunwear</h2>
        <input
          @click="navigateToShop('Sunwear')"
          type="button"
          class="button"
          value="Explore"
        />
      </div>
    </div>
    <div class="image-with-overlay">
      <img src="@/assets/woman-glasses.jpg" alt="Woman with glasses" />
      <div class="overlay">
        <h2 class="text">Kids</h2>
        <input
          @click="navigateToShop('Kids')"
          type="button"
          class="button"
          value="Explore"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const navigateToShop = (category) => {
      router.push({ name: "Shop", params: { category: category } });
    };

    return { navigateToShop };
  }
}

</script>

<style scoped>
.image-container {
  display: flex;
  padding: 10px;
}

.image-with-overlay {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.image-with-overlay img {
  width: 100%;
  height: auto;
  display: block;
  padding-left: 10px;
}

.overlay {
  position: absolute;
  bottom: 20px;
  left: 30px;
  padding: 10px;
}

.text {
  color: white;
  margin-bottom: 15px;
}

.button {
  padding: 10px 30px;
  background-color: white;
  color: rgb(3, 89, 163);
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .image-container {
    flex-direction: column;
  }
  .image-with-overlay {
    padding-bottom: 10px;
  }
}
</style>
