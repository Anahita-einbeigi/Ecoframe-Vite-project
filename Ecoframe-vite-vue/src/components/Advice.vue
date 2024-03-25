<script setup>
import { ref } from "vue";

const props = defineProps({
  imagePosition: String,
  textContent: String,
  heading: String,
  fullTextContent: String,
});

const buttonclicked = ref(false);
</script>

<template>
  <BContainer fluid>
    <BRow id="order-container">
      <BCol sm="12" lg="6" class="no-padding" v-if="imagePosition === 'left'">
        <img src="../assets/eye-check.png" alt="Image" />
      </BCol>
      <BCol sm="12" lg="6" class="no-padding" id="text-content">
        <div id="text-box">
          <h2>{{ heading }}</h2>
          <p>
            {{ textContent }}
          </p>
          <p v-if="buttonclicked === true">
            {{ fullTextContent }}
          </p>
          <BButton
            class="pt-2"
            v-if="buttonclicked === true"
            @click="buttonclicked = false"
            >Close</BButton
          >
          <BButton
            variant="primary"
            v-if="buttonclicked === false"
            @click="buttonclicked = true"
            >Read more</BButton
          >
        </div>
      </BCol>
      <BCol sm="12" lg="6" class="no-padding" v-if="imagePosition === 'right'">
        <img src="../assets/eye-close-up.png" alt="Image" />
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
.custom-height {
  height: 30rem;
}
.no-padding {
  padding: 0;
}
img {
  width: 100%;
}
#text-box {
  padding: 5rem;
}
@media (max-width: 992px) {
  #text-content {
    order: 1;
  }
}
</style>
