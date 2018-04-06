<template>
  <div class="login">
    <h2>{{'auth.welcome' | translate}}</h2>

    <form-error-alert v-show="isErrorAlert" :alert-message="errorAlertMessage"/>

    <form name="login" @submit.prevent="doLogin">
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="userName" v-model="userName" required="required" autofocus/>
          <label class="control-label" for="userName">{{'auth.username' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" v-model="password" required="required"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-center down-container">
        <button class="btn btn-primary btn-micro btn-block rounded-0">
          {{'auth.login' | translate}}
        </button>
      </div>
    </form>

    <basic-loader v-show="isLoading" />
  </div>
</template>

<script>
  import VuesticAlert from '../../../components/vuestic-components/vuestic-alert/VuesticAlert'
  import FormErrorAlert from '../../alerts/FormErrorAlert'
  import BasicLoader from '../../loaders/BasicLoader'

  export default {
    name: 'login',
    metaInfo: {
      title: 'Login'
    },
    components: {
      BasicLoader,
      VuesticAlert,
      FormErrorAlert
    },
    data () {
      return {
        userName: '',
        password: '',
        hidden: true,
        isLoading: false,
        showBadCredentialsAlert: false,
        isErrorAlert: false,
        errorAlertMessage: ''
      }
    },
    computed: {
      sendTo () {
        const { path } = this.$route.query
        if (path !== undefined) return { path }

        return { name: 'Dashboard' }
      }
    },
    methods: {
      async doLogin () {
        // if (!await this.$validator.validateAll()) return

        this.clearErrorAlert()
        this.startLoading()

        const queryParams = {
          userName: this.userName,
          password: this.password
        }

        try {
          await this.$store.dispatch('doLogin', queryParams)
          await this.$store.dispatch('fetchUserDetails')
          this.$router.push(this.sendTo)
        } catch (error) {
          this.handleFailedLogin(error)
        } finally {
          this.stopLoading()
        }
      },
      handleFailedLogin (error) {
        if (!error.response) {
          this.setErrorAlert(error.message)
        } else {
          this.setErrorAlert(error.response.data.message)
        }
      },
      startLoading () {
        this.isLoading = true
      },
      stopLoading () {
        this.isLoading = false
      },
      clearErrorAlert () {
        this.isErrorAlert = false
        this.errorAlertMessage = ''
      },
      setErrorAlert (message = 'Default Error Message') {
        this.isErrorAlert = true
        this.errorAlertMessage = message
      }
    },
    created () {
      if (this.$store.getters.isAuthenticatedUser) {
        return this.$router.push({ name: this.sendTo.name })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import '../../../../node_modules/bootstrap/scss/variables';
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
