<template>
  <!-- Loading animasyonu -->
  <Loading v-if="LoadingPage" />
  <!-- Loading animasyonu -->

  <div class="container" v-else>
    <div class="left_section">
      <div class="cards">
        <div class="front_card">
          <p id="card_type">{{ cardType }}</p>
          <img src="~/assets/images/favicon-32x32.png" alt="card-logo" class="card_logo" />
          <div class="card_container">
            <img src="~/assets/images/bg-card-front.png" alt="front-card" />
            <h1 id="number">{{ cardNumber }}</h1>
            <div class="card_info">
              <span id="name">{{ cardName }}</span>
              <span id="date">
                <span id="month">{{ cardMonth }}</span> /
                <span id="year">{{ cardYear }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="back_card">
          <img src="~/assets/images/bg-card-back.png" alt="back-card" />
          <span id="cvc">{{ cardCvc }}</span>
        </div>
      </div>
    </div>
    <div class="right_section">
      <Form @input-change="updateCardInfo" />
      <Thank />
    </div>
  </div>
</template>

<script>
// Validate kütüphaneleri 'VeeValidate, Vuelidate, Vue Formulate' bu proje özelinde kullanmadım fakat dokümantasyon okudum ama yapabilecek kadar anlamadım.
import cardData from '~/card.js'; // Kart listesi

export default {
  name: 'IndexPage',
  data() {
    return {
      LoadingPage: true,
      cardNumber: "0000 0000 0000 0000",
      cardName: "Kart sahibinin ismi",
      cardYear: "YY",
      cardMonth: "MM",
      cardCvc: "CVC",
      cardType: "Bilinmiyor" // Kart tipi varsayılan
    };
  },


  // gpt 
  methods: {
    detectCardType(cardNumber) {
      const card = cardData.find((card) =>
      card.patterns.some((pattern) => cardNumber.startsWith(pattern.toString()))
    );
    return card ? card.type : "Bilinmiyor";
  },
  // gpt 



  // Formdan gelen bilgileri günceller ve kart numarasına göre kart türünü belirler.
    updateCardInfo({ cardNumber, cardName, cardMonth, cardYear, cardCvc }) {
      this.cardNumber = cardNumber;
      this.cardName = cardName;
      this.cardMonth = cardMonth;
      this.cardYear = cardYear;
      this.cardCvc = cardCvc;
      this.cardType = this.detectCardType(cardNumber); // Kart türünü güncelliyoruz
    }
  },

  // loading animasyonu
  mounted() {
    setTimeout(() => {
      this.LoadingPage = false;
    }, 1500);
  }
  // loading animasyonu
};
</script>


<style>
:root {
  --red: hsl(0, 100%, 66%);
  --white: hsl(0, 0%, 100%);
  --light-grayish-violet: hsl(270, 3%, 87%);
  --dark-grayish-violet: hsl(279, 6%, 55%);
  --very-dark-violet: hsl(278, 68%, 11%);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
}

.hidden {
  display: none !important;
}

#card_type{
  position: absolute;
  right: 10px;
  top: 10px;
  color: var(--white);
  font-size: 24px;
}

.error {
  border: 3px solid var(--red);
}

.input-group {
  position: relative;
  margin-bottom: 15px;
}

.error-message {
  display: none;
  color: red;
  font-size: 12px;
  position: absolute;
top: 0px;
  right: 0;
  gap: 0;
}

.error-message-month,
.error-message-year,
.error-message-cvc{
  position: absolute;
  display: none;
  color: red;
  font-size: 10px;
  position: absolute;
  bottom: -20px;
  text-wrap: nowrap;
}

.error_message::after {
  color: var(--red);
  margin-top: 4px;
}

.container {
  display: flex;
  align-items: center;
  position: relative;
}

.left_section {
  min-height: 100vh;
  width: 40%;
  background-image: url(../assets/images/bg-main-desktop.png);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.cards {
  position: absolute;
  top: 50%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  left: 100%;
  transform: translate(-50%, -50%);
}

.front_card {
  position: relative;
  transform: translate(-100px);
}

.card_logo {
  position: absolute;
  top: 16px;
  left: 16px;
}

#number {
  position: absolute;
  color: var(--white);
  bottom: calc(5 * 16px);
  padding-left:16px ;
}

.card_info {
  position: absolute;
  bottom: 32px;
  left: 16px;
  right: 48px;
  display: flex;
  color: var(--white);
  justify-content: space-between;
}

.back_card {
  position: relative;
}

#cvc {
  position: absolute;
  right: 3.5rem;
  top: 7rem;
  color: var(--light-grayish-violet);
}

.right_section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.right_section form {
  display: grid;
  gap: 1rem;
  width: 350px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
}

label {
  color: var(--very-dark-violet);
  margin-bottom: 5px;
  text-transform: uppercase;
}

input {
  padding: 8px;
  font-size: 18px;
  border: 1px solid var(--dark-grayish-violet);
  border-radius: 4px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-family: inherit;
  color: var(--dark-grayish-violet);
}
input:focus {
  outline-color: var(--light-grayish-violet);
}

.grid_1 {
  display: flex;
  flex-direction: column;
  grid-column: 2 span;
}
.grid_2 {
  display: flex;
  flex-direction: column;
  grid-column: 2 span;
}

.grid_3 {
  display: flex;
  flex-direction: column;
}
.grid_4 {
  display: flex;
  flex-direction: column;
  grid-column: 1 span;
}

.card_information {
  display: flex;
  grid-column: 2 span;
  gap: 16px;
}

#card_date {
  display: flex;
  flex-direction: column;
  grid-column: 1 span;
}

#card_date .two_inp {
  display: flex;
}

.two_inp div {
  flex-direction: column;
}

#card_date div input {
  width: 70px;
  margin-inline: 0.5rem;
  margin-left: 0;
}
#card_cvc {
  width: 100%;
}

form button {
  grid-column: 2 span;
  font-size: 18px;
  height: 50px;
  color: var(--white);
  border-radius: 6px;
  background-color: var(--very-dark-violet);
  cursor: pointer;
}

.thank {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.thank h1 {
  text-transform: uppercase;
  letter-spacing: 3px;
}
.thank p {
  font-size: 18px;
  color: var(--dark-grayish-violet);
}

.thank button {
  color: var(--white);
  width: 100%;
  border-radius: 6px;
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
}

/* Responsive */
@media screen and (max-width: 1023px) {
  .front_card .card_container img,
  .front_card,
  .back_card img,
  .back_card {
    width: 300px;
  }
  .card_logo {
    width: 50px;
  }
  #number {
    font-size: 1.1rem;
  }
  #cvc {
    top: 42%;
    right: 12%;
  }
}
@media screen and (max-width: 767px) {
  .container {
    flex-direction: column;
  }
  .front_card,.card_container img,.back_card,.back_card img {
    width: 280px;
  }
  .left_section {
    width: 100%;
    min-height: 30vh;
    background-image: url("~/assets/images/bg-main-mobile.png");
  }
  .cards {
    flex-direction: column;
    left: 61%;
    top: 60%;
    gap: 0;
  }
  .back_card {
    transform: translateY(70px);
  }
  .front_card{
    z-index: 100;
  }
  .right_section{
    margin-top: 6rem;
  }
}
/* Responsive */

</style>
