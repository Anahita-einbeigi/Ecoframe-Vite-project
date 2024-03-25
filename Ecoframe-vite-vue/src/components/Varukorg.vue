<template>
  <div class="container mt-5 varukorg-container">
    <h2 class="mb-4 text-center">Cart</h2>
    <div v-if="cartItems.length > 0">
      <div class="row mb-3 text-center header-row">
        <div class="col-6 col-md-3">Product</div>
        <div class="col-2 col-md-3">Price</div>
        <div class="col-2 col-md-3">Quantity</div>
        <div class="col-2 col-md-3">Total amount</div>
      </div>
      <div class="cart-item mb-3" v-for="item in cartItems" :key="item.id">
        <div class="row align-items-center text-center item-row">
          <div class="col-2">
            <img
              src="../assets/sunwear.png"
              alt="Produktbild"
              class="img-fluid"
            />
          </div>
          <div class="col-3">{{ item.modelName }}</div>
          <div v-if="item.onSale" class="col-3 text-danger">
            {{ productStore.updateProductSalesPrice(item.id) }} SEK
          </div>
          <div v-else class="col-3">{{ item.price }} SEK</div>
          <div class="col-2">
            <button
              class="btn btn-secondary btn-sm"
              style="background-color: white; color: black"
              @click="updateQuantity(item, -1)"
            >
              -
            </button>
            {{ item.quantity }}
            <button
              class="btn btn-secondary btn-sm"
              style="background-color: white; color: black"
              @click="updateQuantity(item, 1)"
            >
              +
            </button>
          </div>
          <div v-if="item.onSale" class="col-2">
            {{ item.quantity * productStore.updateProductSalesPrice(item.id) }}
            SEK
          </div>
          <div v-if="!item.onSale" class="col-2">
            {{ item.quantity * item.price }} SEK
          </div>
          <div class="col-2">
            <a
              href="#"
              class="text-danger"
              @click.prevent="removeFromCart(item.id)"
              >Remove</a
            >
          </div>
        </div>
      </div>
      <div class="total-price row justify-content-end mt-4">
        <div class="col-6 col-md-4">
          <strong>Totalt: {{ productStore.cartTotal() }} SEK</strong>
        </div>
      </div>
    </div>
    <div v-else class="empty-cart-container">
      <p>Your cart is empty.</p>
    </div>
    <div class="buttons mt-4 d-flex flex-column align-items-center">
      <button
        class="btn btn-outline-dark mb-2"
        style="max-width: 150px"
        @click="continueShopping"
      >
        Continue shopping
      </button>
      <button
        class="btn btn-primary mb-4"
        style="max-width: 150px"
        @click="checkout"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProductStore } from "../stores/productStore";
import { useRouter } from "vue-router";

const router = useRouter();
const productStore = useProductStore();
const cartItems = computed(() => productStore.restoreCartFromSession());
// const cartTotal = computed(() => productStore.cartTotal);

function updateQuantity(item, amount) {
  productStore.updateItemQuantity(item.id, amount);
  productStore.saveCartToSession();
}

function removeFromCart(itemId) {
  productStore.removeItemFromCart(itemId);
  productStore.saveCartToSession();
}

function continueShopping() {
  router.push({ name: "home" });
}

function checkout() {
  router.push({ name: "Checkout" });
}
</script>

<style scoped>
.varukorg-container {
  width: 100%;
  margin: auto;
  margin-bottom: 200px;
  text-align: center;
  min-height: 40vh;
}

.header-row,
.item-row {
  border-bottom: 1px solid #d3d3d3;
  padding: 10px;
  margin-bottom: 20px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.buttons .btn {
  padding: 10px 0;
  width: 75%;
  min-width: 200px;
}

.empty-cart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.item-row .col-3 {
  margin-top: -10px;
}

@media (max-width: 768px) {
  .varukorg-container {
    width: 95%;
    margin: auto;
  }
  .buttons .btn {
    width: 90%;
    margin-bottom: 10px;
  }
  .cart-item,
  .total-price {
    margin: 10px;
  }
  .img-fluid {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
  .item-row .col-3 {
    margin-top: 0;
  }
}
</style>
