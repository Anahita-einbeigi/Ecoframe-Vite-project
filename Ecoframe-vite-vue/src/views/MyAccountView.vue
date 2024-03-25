<script setup>
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();
const currentAccount = productStore.getCurrentAccountFromSession();
</script>

<template>
  <BContainer fluid class="custom-height">
    <h1 class="text-secondary">Hi, {{ currentAccount.fullName }}</h1>
    <h5>Welcome to my account</h5>
    <BRow class="mt-5">
      <BCol md="6" class="border">
        <BCol>
          <h4>Credentials</h4>
          <p>Email: {{ currentAccount.email }}</p>
          <p>Password: {{ currentAccount.password }}</p>
        </BCol>
      </BCol>
      <BCol md="6" class="border">
        <BCol class="mb-2 mt-2">
          <h4>Orders</h4>
          <div v-for="(order, index) in currentAccount.orders" :key="index">
            <h5>Order {{ order.orderNumber }}</h5>

            <div v-if="order.cartItems.length > 0">
              <div class="row text-center mb-3 header-row">
                <div class="col-4">Product</div>
                <div class="col-2">Price</div>
                <div class="col-2">Quantity</div>
                <div class="col-3">Total amount</div>
              </div>
              <div
                class="cart-item mb-3"
                v-for="(item, idx) in order.cartItems"
                :key="idx"
              >
                <div class="row align-items-center text-center item-row">
                  <div class="col-2">
                    <img
                      src="../assets/sunwear.png"
                      alt="Product Image"
                      class="img-fluid"
                      style="max-height: 100px"
                    />
                  </div>
                  <div class="col-2">{{ item.productName }}</div>
                  <div v-if="item.onSale" class="col-2 text-danger">
                    {{ productStore.updateProductSalesPrice(item.id) }}
                    SEK
                  </div>
                  <div v-else class="col-2">{{ item.price }} SEK</div>
                  <div class="col-2">{{ item.quantity }}</div>
                  <div v-if="item.totalAmount" class="col-3">
                    {{
                      item.quantity *
                      productStore.updateProductSalesPrice(item.id)
                    }}
                    SEK
                  </div>
                  <div v-else class="col-3">
                    {{ item.quantity * item.price }} SEK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BCol>
      </BCol>
    </BRow>
    <BButton
      @click="productStore.logout()"
      to="/"
      class="mt-4"
      variant="primary"
    >
      Logout
    </BButton>
  </BContainer>
</template>

<style scoped>
.custom-height {
  min-height: 60vh;
  margin-bottom: 3rem;
}
</style>
