<template>
  <div id="admin-login">
    <form @submit.prevent="login">
      <input ref="first" type="text"
        :class="{ 'has-error': incorrect }"
        v-model="password"
        @focus="clearStatus"
        @keypress="clearStatus"/>
      <p v-if="incorrect"> ❗Incorrect password </p>
      <button> Login </button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'admin-login',
    data() {
      return {
        correctPassword: 'password',
        password: '',
        incorrect: false,
      }
    },
    methods: {
      login() {
        if (this.password === this.correctPassword) {
          this.incorrect = false
          this.$emit('admin:login')
        } else {
          this.incorrect = true
        }
      },
      clearStatus() {
        this.incorrect = false
      }
    }
  }
</script>

<style scoped>

</style>
