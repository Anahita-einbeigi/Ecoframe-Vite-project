<script setup>
const props = defineProps({
  discountToDisplay: Number,
});
</script>
<template>
  <BContainer fluid>
    <BRow class="g-0 custom-card">
      <BCol md="6" class="bg-color d-flex align-items-center">
        <BContainer class="p-5 m-4">
          <h1 class="display-5 text-danger">Spring Sale</h1>
          <p class="lead text-danger">
            {{ props.discountToDisplay }}% off selected frames
          </p>
          <BButton to="/sales" variant="primary">Shop Now</BButton>
        </BContainer>
      </BCol>
      <BCol md="6" class="image-col d-none d-md-flex">
        <img
          src="/src/assets/cta-image.jpg"
          class="img-fluid full-height-width"
          alt="Spring Sale"
        />
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
.bg-color {
  background-color: #cbbeae;
}
.custom-card {
  min-height: 50vh;
}

.image-col {
  position: relative;
}

.full-height-width {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

h1 {
  font-weight: 600;
}
</style>
