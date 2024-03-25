<script setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useProductStore } from "../stores/productStore";
import { ref } from "vue";
import router from "@/router";
const productStore = useProductStore();

// const logedIn = ref(false);
const loginError = ref("");

const schema = yup.object({
  email: yup.string().required().email().label("Email address"),
  password: yup.string().required().min(6).label("Password"),
});

const { defineField, handleSubmit, resetForm, errors, values } = useForm({
  validationSchema: schema,
});

const bootstrapConfig = (state) => ({
  props: {
    invalidFeedback: state.errors[0],
    state: state.errors[0] ? false : state.touched ? true : undefined,
  },
});

const [email, emailProps] = defineField("email", bootstrapConfig);
const [password, passwordProps] = defineField("password", bootstrapConfig);

const goToMyAccount = () =>
  setTimeout(() => {
    router.push("/myaccount");
  }, 4000);

// och sen ska ja kunna logga in igen
// och då ska ja komma tillbaka till my account sidan

const onSubmit = handleSubmit((values) => {
  const validate = productStore.validateLogin(values);
  productStore.currentAccount = validate;
  console.log(typeof productStore.currentAccount);
  productStore.saveCurrentAccountToSession();
  if (validate) {
    resetForm();
    productStore.loggedIn = true;
    productStore.saveLoggedInToSession();
    goToMyAccount();
  } else {
    loginError.value = "Invalid email or password";
  }
});
</script>

<template>
  <BContainer class="custom-height">
    <BCol
      col="12"
      md="6"
      sm="6"
      class="m-5 p-4 bg-light custom"
      v-if="productStore.loggedIn === false"
    >
      <h2 class="text-uppercase text-primary m-4">Login</h2>

      <BForm @submit="onSubmit()" @reset="resetForm()">
        <BFormGroup
          id="input-group-2"
          label="Email address:"
          label-for="input-2"
          v-bind="emailProps"
          class="mb-3"
        >
          <BFormInput
            id="input-2"
            v-model="email"
            type="email"
            placeholder="Enter email"
          ></BFormInput>
        </BFormGroup>

        <BFormGroup
          id="input-group-3"
          label="Password:"
          label-for="input-3"
          v-bind="passwordProps"
          :description="loginError"
          class="mb-3"
        >
          <BFormInput
            id="input-3"
            v-model="password"
            type="password"
            placeholder="Enter password"
          ></BFormInput>
        </BFormGroup>

        <BButton class="mt-2 me-4" type="submit" variant="primary"
          >Login</BButton
        >
        <BButton class="mt-2" type="reset" variant="danger">Reset</BButton>
      </BForm>
      <p class="text-center mt-4">
        Not a member yet?
        <router-link class="text-info" to="/createaccount"
          >sign up here</router-link
        >
      </p>
    </BCol>
    <BCol
      v-if="productStore.loggedIn"
      class="m-5 p-4 d-flex flex-column justify-content-center align-items-center"
    >
      <h2 class="text-uppercase text-primary m-4">
        logging in to your account
      </h2>
      <BSpinner
        style="width: 3rem; height: 3rem"
        label="Large"
        variant="primary"
      />
    </BCol>
  </BContainer>
</template>

<style lang="scss" scoped>
.custom-height {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .custom {
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
