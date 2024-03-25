<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();
const showHelpModal = ref(false);
const showAccountModal = ref(false);

const toggleLogin = computed(() => {
  productStore.getLoggedInFromSession();
  return productStore.loggedIn ? "Log out" : "Login";
});
</script>

<template>
  <BContainer>
    <BRow class="d-flex align-items-center justify-between">
      <BCol col="12" class="d-flex pt-2">
        <router-link to="/" class="router-link-custom"
          ><h2 to="home" class="display-5">
            <span>eco</span>frame
          </h2></router-link
        >
      </BCol>
      <BCol
        col="12"
        class="d-flex p-4 align-items-center justify-content-end gap-4 d-none d-md-flex"
      >
        <BDropdown
          end
          variant="link"
          @click="showHelpModal = !showHelpModal"
          v-model="showHelpModal"
          offset="10"
          text="Customer support"
        >
          <BDropdownItem to="/CustomerSupport">FAQs</BDropdownItem>
          <BDropdownItem to="/CustomerSupport">Contact</BDropdownItem>
          <BDropdownItem to="/CustomerSupport"
            >Terms of Purchase and devlivery</BDropdownItem
          >
        </BDropdown>

        <BDropdown
          :variant="
            !productStore.loggedIn ? 'outline-primary' : 'outline-success'
          "
          @click="showAccountModal = !showAccountModal"
          v-model="showAccountModal"
          offset="10"
          text="Account"
        >
          <BDropdownItem v-if="productStore.loggedIn"
            ><router-link to="/" @click="productStore.logout">{{
              toggleLogin
            }}</router-link></BDropdownItem
          >
          <BDropdownItem v-else
            ><router-link to="/loginpage">{{
              toggleLogin
            }}</router-link></BDropdownItem
          >
          <BDropdownItem v-if="!productStore.loggedIn"
            ><router-link class="text-primary" to="createaccount"
              >Create account</router-link
            ></BDropdownItem
          >
          <BDropdownItem v-if="productStore.loggedIn"
            ><router-link class="text-primary" to="myaccount"
              >My account</router-link
            ></BDropdownItem
          >
        </BDropdown>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-bottom: 0;
}

span {
  font-weight: 200;
}

.router-link-custom {
  text-decoration: none;
}

.router-link-custom h2,
.router-link-custom span {
  color: #000;
}
</style>
