<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="grid_1 input-group">
        <label for="card_name">Kart sahibinin ismi</label>
        <span v-if="errors.name" class="error-message" id="name-error">Değerli isminizi bahşeder misiniz?</span>
        <input
          v-model="inputName"
          type="text"
          placeholder="İsminiz"
          id="card_name"
          @input="emitInput"
          :class="{'error': errors.name}"
          required
        />
      </div>
      <div class="grid_2 input-group">
        <label for="card_number">Kart Numarası</label>
        <input
          type="text"
          maxlength="16"
          v-model="inputNumber"
          placeholder="Kart Numaranız"
          @input="emitInput"
          :class="{'error': errors.number}"
        />
        <span v-if="errors.number" class="error-message" id="number-error">Geçerli bir kart numarası girin</span>
      </div>
      <div class="card_information">
        <div id="card_date">
          <label for="card_date">Ay ve Yıl</label>
          <div class="two_inp">
            <div class="input-group">
              <input
                v-model="inputMonth"
                @input="emitInput"
                type="text"
                placeholder="MM"
                minlength="2"
                maxlength="2"
                min="1"
                max="12"
                id="card_month"
                :class="{'error': errors.month}"
                required
              />
              <span v-if="errors.month" class="error-message-month" id="month-error">Geçerli bir ay girin</span>
            </div>
            <div class="input-group">
              <input
                v-model="inputYear"
                @input="emitInput"
                type="text"
                minlength="2"
                maxlength="2"
                placeholder="YY"
                max="99"
                min="24"
                id="card_year"
                :class="{'error': errors.year}"
                required
              />
              <span v-if="errors.year" class="error-message-year" id="year-error">Geçerli bir yıl girin</span>
            </div>
          </div>
        </div>
        <div class="grid_4 input-group">
          <label for="card_cvc">Güvenlik Kodu</label>
          <input
            v-model="inputCvc"
            @input="emitInput"
            type="text"
            maxlength="3"
            placeholder="Güvenlik Kodu"
            id="card_cvc"
            :class="{'error': errors.cvc}"
            required
          />
          <span v-if="errors.cvc" class="error-message-cvc" id="cvc-error">CVC 3 haneli olmalıdır</span>
        </div>
      </div>
      <button id="submit_btn" type="submit">Gönder</button>
    </form>

    <!-- Teşekkür mesajı -->
    <div v-if="formCompleted" class="completed-message">
      Teşekkürler! Bilgileriniz başarıyla gönderildi.
    </div>
  </div>
</template>

<script>
export default {
  data() {
  return {
    // Form alanlarının her birini saklayan veri değişkenleri
    inputNumber: "",
    inputName: "",
    inputYear: "",
    inputMonth: "",
    inputCvc: "",

    // Her form alanı için hata durumlarını belirten boolean değerler
    errors: {
      name: false,
      number: false,
      month: false,
      year: false,
      cvc: false
    },

    // Formun başarıyla gönderilip gönderilmediğini belirten durum
    formCompleted: false
  };
},
  methods: {
    // formdaki verileri parent elemana iletme
    emitInput() {
      this.$emit('input-change', {
        cardNumber: this.inputNumber,
        cardName: this.inputName,
        cardMonth: this.inputMonth,
        cardYear: this.inputYear,
        cardCvc: this.inputCvc
      });
    },

    // Form Validate
    validateForm() {
      // Hata mesajlarını sıfırla
      this.errors = {
        name: false,
        number: false,
        month: false,
        year: false,
        cvc: false
      };
      
      if (!this.inputName) {
        this.errors.name = true;
      }
      
      if (!this.inputNumber || this.inputNumber.length < 16) {
        this.errors.number = true;
      }

      if (!this.inputMonth || this.inputMonth < 1 || this.inputMonth > 12) {
        this.errors.month = true;
      }
      
      if (!this.inputYear || this.inputYear < 24 || this.inputYear > 99) {
        this.errors.year = true;
      }
      
      if (this.inputCvc.length !== 3) {
        this.errors.cvc = true;
      }
      
      // Formun tamamlanıp tamamlanmadığını kontrol et
      return !(
        this.errors.name ||
        this.errors.number ||
        this.errors.month ||
        this.errors.year ||
        this.errors.cvc
      );
    },
    //  Form Validate
    submitForm() {
      if (this.validateForm()) {
        this.formCompleted = true;
        this.emitInput(); // Form gönderildiğinde veriyi ilet
        setTimeout(()=>{
          window.location.reload();
        },1000)
      } else {
        this.formCompleted = false;
      }
    }
  }
}
</script>

<style scoped>
.error {
  border: 1px solid red;
}

.error-message,
.error-message-month,
.error-message-year,
.error-message-cvc {
  color: red;
  display: flex;
}

.completed-message {
  color: green;
}
</style>
