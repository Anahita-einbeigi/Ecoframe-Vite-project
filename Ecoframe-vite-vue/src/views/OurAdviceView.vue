<script setup>
import Advice from "@/components/Advice.vue";
import { ref } from "vue";

// left advice
const textContentLeft = ref(
  "Our advice is to always wear sunglasses when you are outside, even when it is cloudy. The sun's rays can still reach your eyes and cause damage."
);
const headingLeft = ref("Get Sunwear");

const fullTextContentLeft = ref(
  "Wearing sunglasses isn't just about fashion, it's crucial for eye protection. These stylish accessories shield our eyes from harmful UV rays, reducing the risk of cataracts, macular degeneration, and other eye conditions. Moreover, they safeguard delicate skin around the eyes, preventing wrinkles and sunspots. Whether it's a sunny day or overcast, UV radiation persists, making sunglasses an everyday necessity. Beyond health benefits, they enhance visibility by reducing glare, ensuring safer driving and outdoor activities."
);

// right advice
const textContentRight = ref(
  "If you are experiencing any eye problems, it is important to get your eyes checked. We offer a free eye test, so book an appointment today."
);
const headingRight = ref("Better Safe Than Sorry");

const fullTextContentRight = ref(
  "Regular eye check-ups are vital, especially when experiencing sight issues. Timely examinations can detect underlying conditions like glaucoma, cataracts, or macular degeneration, allowing for early intervention and prevention of irreversible damage. Neglecting symptoms such as blurred vision, headaches, or eye strain can exacerbate problems, impacting daily life and productivity. Professional assessments provide accurate diagnoses and personalized treatment plans, ensuring optimal eye health and visual acuity."
);
</script>

<template>
  <h1 class="text-center margin-top">Our advice</h1>
  <Advice
    image-position="left"
    :text-content="textContentLeft"
    :heading="headingLeft"
    :full-text-content="fullTextContentLeft"
  />
  <Advice
    image-position="right"
    :text-content="textContentRight"
    :heading="headingRight"
    :full-text-content="fullTextContentRight"
  />
</template>

<style scoped>
.margin-top {
  margin-top: 5rem;
  margin-bottom: 2rem;
}
</style>
