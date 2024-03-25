[10:27] Frida Eriksson - JSU23 GBG
<template>
  <div class="checkout-container">
    <h2>Checkout</h2>
    <br />
    <div class="summary-container">
      <p>Summary:</p>
      <div v-if="cartItems.length > 0">
        <div class="row text-center mb-3 header-row">
          <div class="col-4">Product</div>
          <div class="col-2">Price</div>
          <div class="col-2">Quantity</div>
          <div class="col-3">Total amount</div>
        </div>
        <div class="cart-item mb-3" v-for="item in cartItems" :key="item.id">
          <div class="row align-items-center text-center item-row">
            <div class="col-2">
              <img
                src="../assets/sunwear.png"
                alt="Product Image"
                class="img-fluid"
                style="max-height: 100px"
              />
            </div>
            <div class="col-2">{{ item.modelName }}</div>
            <div v-if="item.onSale" class="col-2 text-danger">
              {{ productStore.updateProductSalesPrice(item.id) }} SEK
            </div>
            <div v-else class="col-2">{{ item.price }} SEK</div>
            <div class="col-2">{{ item.quantity }}</div>
            <div v-if="item.onSale" class="col-3">
              {{
                item.quantity * productStore.updateProductSalesPrice(item.id)
              }}
              SEK
            </div>
            <div v-else class="col-3">{{ item.quantity * item.price }} SEK</div>
          </div>
        </div>
 
        <!-- Display cart total -->
        <div class="row text-center total-row">
          <div class="col-7"></div>
          <div class="col-2"><strong>Total</strong></div>
          <div class="col-3">
            <strong>{{ productStore.cartTotal() }} SEK</strong>
          </div>
        </div>
      </div>
      <div v-else>Your cart is empty</div>
    </div>
    <br />
    <div v-if="!showSummary">
      <div v-if="!productStore.loggedIn">
        <p>Are you a member? <span @click="goToLogin" class="toLogin">Login</span> or continue as guest</p>
      </div>
    <div class="input-container">
      <!-- Email input -->
      <div role="group">
        <BFormInput
          id="input-email"
          v-model="email"
          :state="emailIsValid ? true : false"
          aria-describedby="input-email-help"
          placeholder="Email address"
          trim
        />
      </div>
      <div role="group">
        <!-- Zipcode input -->
        <BFormInput
          id="input-zipcode"
          v-model="zipcode"
          :state="zipcodeIsValid ? true : false"
          aria-describedby="input-zipcode-help"
          placeholder="Zipcode"
          trim
          @input="onZipcodeInput"
        />
      </div>
    </div>
    <div class="button">
      <!-- Continue button with disabled attribute -->
      <BButton variant="success" style="min-width: 200px;" @click="toggleContent" :disabled="!isFormValid">Continue</BButton>
    </div>
    <div v-if="showContent">
      <!-- Delivery options -->
      <div class="deliveryOptions-container">
        <p><strong>Delivery options:</strong></p>
        <div>
          <BFormRadio
            v-for="option in deliveryOptions"
            :key="option.value"
            v-model="selectedDeliveryOption"
            :name="'delivery-option'"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.text }}
            <br>
            <div> {{ option.description }} </div>
            <div class="line"></div>
          </BFormRadio>
        </div>
      </div>
      <div v-if="showContent">
        <div class="line"></div>
        <!-- Shipping address -->
        <div class="address-form">
          <p><strong>Shipping address:</strong></p>
          <BFormInput v-model="firstName" placeholder="First name" />
          <BFormInput v-model="lastName" placeholder="Last name" />
          <BFormInput v-model="address" placeholder="Address" />
          <BFormInput v-model="city" placeholder="City" />
          <BFormInput v-model="phone" placeholder="Phone" />
        </div>
        <div class="line"></div>
        <!-- Payment options -->
        <div class="paymentOptions-container">
          <p><strong>Payment options:</strong></p>
          <div v-for="option in paymentOptions" :key="option.value">
            <BFormRadio
              v-model="selectedPaymentOption"
              :name="'payment-option'"
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.text }}
              <div class="line"></div>
            </BFormRadio>
          </div>
        </div>
        <!-- Card payment input -->
        <div
          v-if="showCardPaymentInput && selectedPaymentOption === 'X'"
          class="card-payment-input"
        >
          <p><strong>Card Information:</strong></p>
          <BFormInput placeholder="Card Number" />
        </div>
        <!-- Pay button -->
        <div class="line"></div>
        <div class="button">
          <BButton
            variant="primary"
            style="min-width: 200px"
            @click="pay"
            :disabled="!isPaymentValid"
            >Pay</BButton
          >
        </div>
      </div>
    </div>
    </div>
    <!-- Will only show up when the information is correct and payment initiated -->
    <div v-else="showSummary">
      <p><strong>Your information:</strong></p>
      <!-- Custom summary data -->
      <p><strong> {{ firstName }} {{ lastName }} </strong></p>
      <p> {{ address }}, {{ zipcode }}, {{ city }}</p>
      <p>{{ email }}, {{ phone }}</p>
      <p><strong>Delivery:</strong> {{ selectedDeliveryOptionText }},
        <strong>Payment</strong> {{ selectedPaymentOptionText }}</p>
      <BButton
        variant="primary"
        style="min-width: 200px"
        @click="toOrderConfirmation"
        >Confirm order</BButton
      >
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed, watch } from "vue";
import { useProductStore } from "../stores/productStore";
import { useRouter } from "vue-router";
 
const router = useRouter();
const productStore = useProductStore();
const cartItems = computed(() => productStore.getCartItems);
 
const showSummary = ref(false);
const showContent = ref(false);
 
const email = ref("");
const zipcode = ref("");
const firstName = ref("");
const lastName = ref("");
const address = ref("");
const city = ref("");
const phone = ref("");
 
const emailIsValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});
 
const zipcodeIsValid = computed(() => {
  const zipcodeRegex = /^\d{5}$/;
  return zipcodeRegex.test(zipcode.value);
});
 
const isFormValid = computed(() => {
  return emailIsValid.value && zipcodeIsValid.value;
});
 
const isPaymentValid = computed(() => {
  return (
    isFormValid.value &&
    firstName.value !== "" &&
    lastName.value !== "" &&
    address.value !== "" &&
    city.value !== "" &&
    phone.value !== "" &&
    selectedPaymentOption.value !== ""
  );
});
 
const onZipcodeInput = (event) => {
  zipcode.value = event.target.value.replace(/\D/g, "");
};
 
const deliveryOptions = [
  {
    text: "Box shipping",
    value: "A",
    name: "delivery-option",
    description: "Delivers to closest Instabox",
    disabled: false,
  },
  {
    text: "Post office",
    value: "B",
    name: "delivery-option",
    description: "Delivers to closest post office",
    disabled: false,
  },
  {
    text: "Collect at store",
    value: "C",
    name: "delivery-option",
    disabled: false,
  },
];
 
const paymentOptions = [
  { text: "Cardpayment", value: "X", name: "payment-option", disabled: false },
  { text: "Swish", value: "Y", name: "payment-option", disabled: false },
  { text: "Invoice", value: "Z", name: "payment-option", disabled: false },
];
 
const selectedDeliveryOption = ref("");
const selectedPaymentOption = ref("");
 
const goToLogin = () => {
  router.push({ name: "LoginPage" });
}
 
const toggleContent = () => {
  showContent.value = !showContent.value;
};
 
const showCardPaymentInput = ref(false);
 
watch(selectedPaymentOption, (newValue) => {
  showCardPaymentInput.value = newValue === "X";
});
 
const summaryData = ref({});
 
const selectedDeliveryOptionText = computed(() => {
  const option = deliveryOptions.find(opt => opt.value === selectedDeliveryOption.value);
  return option ? option.text : '';
});
 
const selectedPaymentOptionText = computed(() => {
  const option = paymentOptions.find(opt => opt.value === selectedPaymentOption.value);
  return option ? option.text : '';
});
 
const pay = () => {
  summaryData.value = saveSummaryData();
  showSummary.value = true;
};
 
const saveSummaryData = () => {
  const orderNumber = productStore.createOrderNumber();
  const cartItemsData = cartItems.value.map(item => ({
    productName: item.modelName,
    quantity: item.quantity,
    id: item.id,
    price: item.onSale ? productStore.updateProductSalesPrice(item.id) : item.price,
  }));
 
  return {
    orderNumber: orderNumber,
    email: email.value,
    zipcode: zipcode.value,
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    phone: phone.value,
    selectedDeliveryOption: selectedDeliveryOptionText.value,
    selectedPaymentOption: selectedPaymentOptionText.value,
    cartItems: cartItemsData
  };
};
console.log("Summary Data:", summaryData);
 
const toOrderConfirmation = () => {
  const summaryData = saveSummaryData();
 
  if (productStore.loggedIn) {
    const currentAccount = productStore.getCurrentAccountFromSession(); 
 
    if (currentAccount && typeof currentAccount === 'object') {
      if (!Array.isArray(currentAccount.orders)) {
        currentAccount.orders = [];
      }
 
      const orderData = {
        orderNumber: summaryData.orderNumber,
        cartItems: summaryData.cartItems
      };
      currentAccount.orders.push(orderData); 
       sessionStorage.setItem("currentAccount", JSON.stringify(currentAccount));
      productStore.clearCart();
      router.push({ name: "OrderConfirmation" });
    }
  } else {
    productStore.clearCart();
    router.push({ name: "OrderConfirmation" });
  }
 
};
 
</script>
 
<style scoped>
.checkout-container {
  width: 100vh;
  margin: auto;
  margin-bottom: 200px;
}
.summary-container {
  padding: 15px;
}
 
.summary-container p {
  font-weight: bold;
}
 
.input-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
 
.input-container > div {
  flex: 1;
  padding-right: 20px;
}
 
.address-form {
  margin-bottom: 20px;
}
 
.button {
  margin-top: 20px;
  text-align: right;
}
 
.line {
  border-top: 1px solid #d3d3d3;
  margin-top: 20px;
  margin-bottom: 20px;
}
 
.toLogin {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
 
.header-row,
.item-row {
  border-bottom: 1px solid #d3d3d3;
  padding: 10px;
  margin-bottom: 20px;
}
 
h2 {
text-align: center;
}
 
@media (max-width: 768px) {
    .checkout-container {
      width: 90%
    }
 
    .summary-container {
      padding: 5px;
    }
 
    .input-container > div {
      padding: 5px;
    }
 
    .button {
      margin-top: 5px;
    }
 
    .line {
      margin: 10px 0;
    }
 
    .header-row,
    .item-row {
      padding: 10px;
      margin-bottom: 5px;
    }
}
 
</style>
 