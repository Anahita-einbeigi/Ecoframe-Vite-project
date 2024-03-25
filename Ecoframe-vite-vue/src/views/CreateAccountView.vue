<script setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useProductStore } from "../stores/productStore";
import { ref } from "vue";
import router from "@/router";
import { BContainer } from "bootstrap-vue-next";
const productStore = useProductStore();

const accountCreated = ref(false);
const existingAccount = ref(false);

const schema = yup.object({
  email: yup.string().required().email().label("Email address"),
  fullName: yup.string().required().label("Full name"),
  password: yup.string().required().min(6).label("Password"),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match")
    .label("Password confirmation"),
  terms: yup
    .boolean()
    .required()
    .isTrue("You must agree to terms and conditions")
    .label("terms agreement"),
});

const { defineField, handleSubmit, resetForm, errors, values } = useForm({
  validationSchema: schema,
  initialValues: {
    terms: false,
  },
});

const bootstrapConfig = (state) => ({
  props: {
    validFeedback: "Looks alright!",
    invalidFeedback: state.errors[0],
    state: state.errors[0] ? false : state.touched ? true : undefined,
  },
});

const [fullName, fullNameProps] = defineField("fullName", bootstrapConfig);
const [email, emailProps] = defineField("email", bootstrapConfig);
const [password, passwordProps] = defineField("password", bootstrapConfig);
const [passwordConfirm, passwordConfirmProps] = defineField(
  "passwordConfirm",
  bootstrapConfig
);
const [terms, termsProps] = defineField("terms", bootstrapConfig);

const goToLogin = () =>
  setTimeout(() => {
    router.push("/loginPage");
  }, 4000);

const onSubmit = handleSubmit((values) => {
  const accounts = productStore.getAccountsFromSession();
  const accountExists = accounts.find(
    (account) =>
      account.email === values.email && account.password === values.password
  );

  if (accountExists) {
    console.log("account exists");
    existingAccount.value = true;
    console.log(accountExists);
    return;
  } else {
    productStore.createNewAccount(values);
    resetForm();
    accountCreated.value = true;
    goToLogin();
  }
});
</script>

<template>
  <BContainer class="custom-height">
    <BCol
      sm="12"
      md="6"
      lg="6"
      class="m-5 p-4 bg-light custom"
      v-if="accountCreated === false && existingAccount === false"
    >
      <h2 class="text-uppercase text-primary m-4">Sign up</h2>
      <h5 class="text-uppercase text-primary m-4 text-wrap">
        Become a ecofriend!
      </h5>
      <BForm @submit="onSubmit()" @reset="resetForm()">
        <BFormGroup
          id="input-group-1"
          label="Full name:"
          label-for="input-1"
          v-bind="fullNameProps"
          class="mb-3"
        >
          <BFormInput
            id="input-1"
            v-model="fullName"
            placeholder="Enter name"
          ></BFormInput>
        </BFormGroup>

        <BFormGroup
          id="input-group-2"
          label="Email address:"
          label-for="input-2"
          v-bind="emailProps"
          description="We'll never share your email with anyone else."
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
          class="mb-3"
        >
          <BFormInput
            id="input-3"
            v-model="password"
            type="password"
            placeholder="Enter password"
          ></BFormInput>
        </BFormGroup>

        <BFormGroup
          id="input-group-4"
          label="Password confirmation:"
          v-bind="passwordConfirmProps"
          label-for="input-4"
          class="mb-3"
        >
          <BFormInput
            id="input-4"
            v-model="passwordConfirm"
            type="password"
            placeholder="Enter password confirmation"
          ></BFormInput>
        </BFormGroup>

        <BFormGroup id="input-group-4" v-bind="termsProps" class="mb-3">
          <BFormCheckbox v-model="terms" :value="true"
            >I agree to terms and conditions</BFormCheckbox
          >
        </BFormGroup>

        <BButton class="mt-2 me-4" type="submit" variant="primary"
          >Submit</BButton
        >
        <BButton class="mt-2" type="reset" variant="danger">Reset</BButton>
      </BForm>
      <p class="text-center mt-4">
        Allready member?
        <router-link class="text-info" to="/LoginPage">login here</router-link>
      </p>
    </BCol>
    <BCol v-if="accountCreated === true" class="m-5 p-4 bg-light">
      <h2 class="text-uppercase text-primary m-4 text-center">
        Account created
      </h2>
      <p class="text-center mt-4">
        You can now login and start using ecoframe. You will be redirected to
        the login page in 5 seconds.
      </p>
    </BCol>
    <BCol v-if="existingAccount === true" class="m-5 p-4 bg-light">
      <h2 class="text-uppercase text-primary m-4 text-center">
        Account allready exist
      </h2>
      <p class="text-center mt-4">
        Go to the login page and
        <router-link to="/loginpage">login </router-link>with your credentials.
      </p>
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
