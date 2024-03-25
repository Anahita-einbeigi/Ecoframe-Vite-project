<template>
  <div class="image-container">
    <div class="image-wrapper">
      <div class="image-circle">
        <img
          src="@/assets/outlined-glasses.png"
          alt="Black outlined glasses"
          @click="goToAboutUs"
        />
      </div>
      <p class="infoText">Ecofriendly</p>
    </div>
    <div class="image-wrapper">
      <div class="image-circle">
        <img
          src="@/assets/outlined-award.png"
          alt="Black outlined award"
          @click="goToQNA"
        />
      </div>
      <p class="infoText">Lifetime Warranty</p>
    </div>
    <div class="image-wrapper">
      <div class="image-circle">
        <img
          src="@/assets/outlined-delivery-truck.png"
          alt="Black outlined deliverytruck"
          @click="goToQNA"
        />
      </div>
      <p class="infoText">Fast delivery</p>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToQNA = () => {
  router.push({ name: "CustomerSupport" });
};

const goToAboutUs = () => {
  router.push({ name: "AboutUs" });
};
</script>

<style scoped>
.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 130px;
  padding-bottom: 70px;
  padding-top: 70px;
  overflow-x: auto;
}

.image-wrapper {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
}

.image-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgb(240, 237, 237);
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 0 8px; */
  transition: transform 0.3s;
}

.image-circle:hover {
  transform: scale(1.1);
}

.image-circle img {
  max-width: 70%;
  max-height: 70%;
}

.infoText {
  font-size: 20px;
}

@media screen and (max-width: 768px) {
  .image-container {
    /* justify-content: flex-start; */
    /* padding: 30px 15px; */
    gap: 10px;
    padding-bottom: 30px;
    padding-top: 30px;
  }
  /*
  .image-wrapper {
    flex: 0 0 auto;
  } */

  .image-circle {
    width: 50px;
    height: 50px;
    margin: 0 15px;
  }

  .infoText {
    margin-top: 4px;
    font-size: 10px;
  }
}
</style>
