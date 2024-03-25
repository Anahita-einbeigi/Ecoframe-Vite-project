<template>
  <BContainer class="footer-container" fluid>
    <BRow>
      <BCol sm="12" md="6" cols="6">
        <h2>ECO<b>FRAME</b></h2>
        <ul class="footer-list">
          <li><a href="/about-us">About us</a></li>
          <li><RouterLink to="/customersupport">Contact</RouterLink></li>
        </ul>
        <div class="btn-group btn-group-lg" role="group" aria-label="Large button group">
          <button type="button" class="btn btn-outline-light"><i class="bi bi-facebook"></i></button>
          <button type="button" class="btn btn-outline-light"><i class="bi bi-instagram"></i></button>
          <button type="button" class="btn btn-outline-light"><i class="bi bi-twitter-x"></i></button>
        </div>
        <p id="copyright">©EcoFrame 2024</p>
      </BCol>
      <BCol sm="12" md="3">
        <h3>Info</h3>
        <ul class="footer-list">
          <li><RouterLink to="/customersupport">Delivery</RouterLink></li>
          <li><RouterLink to="/customersupport">Warrenty</RouterLink></li>
          <li><RouterLink to="/customersupport">Support</RouterLink></li>
          <li><RouterLink to="/customersupport">Privacy Policy</RouterLink></li>
          <li><RouterLink to="/customersupport">Terms & Conditions</RouterLink></li>
        </ul>

      </BCol>
      <BCol>
        <h3>Shops</h3>
        <p>Sweden <br> Vasagatan 23, Göteborg</p>

        <p class="font-weight-light">
          <b>Open hours</b> <br>
          Monday-Friday: 10-18 <br>
          Saturday: 12-18 <br>
          Sunday: Closed
        </p>
      </BCol>
    </BRow>
  </BContainer>
</template>


<style scoped>
.footer-container {
  background-color: #025162;
  color: white;
  padding: 80px;
}

.footer-list {
  list-style-type: none;
  padding-left: 0;
  color: inherit;
}

a {
  color: white;
}

#copyright {
  margin-top: 1rem;
}
</style>
