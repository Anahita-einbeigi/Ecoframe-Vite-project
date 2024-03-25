<template>
  <BContainer fluid class="px-md-5 custom-container">
    <BRow class="justify-content-center my-5">
      <BCol cols="12" class="text-center">
        <h1>About Ecoframe</h1>
      </BCol>
    </BRow>

    <BRow class="align-items-center my-5">
      <BCol md="6" class="custom-col img-col">
        <BImg
          src="src/assets/Image/aboutus1.jpg"
          style="max-height: 620px"
          alt="Ecoframe Eyewear"
          fluid
        ></BImg>
      </BCol>
      <BCol md="6" class="custom-col text-col">
        <p class="lead">Unleash Your Inner Hero with Ecoframe Eyewear</p>
        <p>
          Ecoframe Eyewear - choose your alter ego. Crafted with meticulous
          attention to detail, Ecoframe Eyewear transcends time, embodying
          longevity and unparalleled quality. No matter where your journey takes
          you, Ecoframe Eyewear remains steadfast, an unwavering companion ready
          to enhance every step of your unique path.
        </p>
        <p>
          Dare to embrace the extraordinary. Choose your alter ego and let
          Ecoframe Eyewear become your window to an extraordinary world that
          exists just beyond the edge of perception.
        </p>
        <router-link to="/" class="see-collection-link"
          >See the collection</router-link
        >
      </BCol>
    </BRow>

    <BRow class="align-items-center my-5 flex-column-reverse flex-md-row">
      <BCol md="6" class="custom-col text-col">
        <p class="h3">Who are we? We're more than just a sunglasses brand.</p>
        <p>
          Join our movement. We celebrate individuals who defy the norm and live
          life on their terms. From chefs and podcasters to store owners who
          stock Ecoframe, our community is a vibrant tapestry of inspiring
          journeys. Join us in celebrating limitless potential and unique
          perspectives.
        </p>
        <p>
          Our belief lies in the idea of less: fewer, better products that hold
          genuine value. We understand that it's okay to make purchases, as long
          as they bring meaning to your life and align with your values.
        </p>
        <p>
          Together, let's transcend boundaries and break stereotypes. Welcome to
          a world where the extraordinary is not just a dream but a reality
          waiting to be revealed.
        </p>
      </BCol>
      <BCol md="6" class="custom-col img-col">
        <BImg
          src="src/assets/Image/aboutus2.jpg"
          style="max-height: 620px"
          alt="Ecoframe Eyewear Community"
          fluid
        ></BImg>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
import { BContainer, BRow, BCol, BImg } from "bootstrap-vue-next";
</script>

<style scoped>
@media (min-width: 992px) {
  .custom-col.img-col {
    padding-right: 30px !important;
  }
  .custom-col.text-col {
    padding-left: 30px !important;
  }
}
@media (max-width: 758px) {
  .custom-container {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
  .custom-col.img-col {
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 85% !important;
    margin-bottom: 20px !important;
  }
  .custom-col.text-col {
    margin-left: 15px !important;
    margin-right: 5px !important;
    margin-bottom: 20px !important;
  }
}
</style>
