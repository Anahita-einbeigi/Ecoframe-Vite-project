<script setup>
const props = defineProps({
  discountToDisplay: Number,
});
</script>

<template>
  <BContainer fluid>
    <BRow>
      <BCol
        sm="12"
        lg="6"
        class="p-0 text-light bg-danger d-flex flex-column justify-content-center align-items-start"
      >
        <div class="ms-5 ps-5 mb-5 mt-5">
          <h1 class="display-5 text-light">SPRING SALES</h1>
          <h4>{{ props.discountToDisplay }}% off on slected frames</h4>
          <p>To the end of April</p>

          <BButton to="createaccount" variant="primary" class="text-light"
            >Become a member</BButton
          >
        </div>
      </BCol>
      <BCol sm="12" lg="6" class="p-0 d-none d-md-flex">
        <img src="../assets/eye-close-up.png" alt="Image" />
      </BCol>
    </BRow>
  </BContainer>
</template>

<style>
img {
  width: 100%;
}
</style>
