<template>
  <div class="login">
    <h2>{{'auth.welcome' | translate}}</h2>

    <div class="row" v-if="showBadCredentialsAlert">
      <div class="col-md-12">
        <vuestic-alert type="danger" :withCloseBtn="true">
          {{'extra.alerts.badCredentials' | translate}}
          <i class="fa fa-close alert-close" @click="showBadCredentialsAlert=false"></i>
        </vuestic-alert>
      </div>
    </div>

    <form name="login" v-on:submit.prevent="doLogin">
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
        <button class="btn btn-primary" type="submit">
          {{'auth.login' | translate}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import store from '../../../store'
  import VuesticAlert from '../../../components/vuestic-components/vuestic-alert/VuesticAlert'

  import auth from '../../../helpers/auth'
  import helpers from '../../../helpers'
  import api from '../../../services/beeStockApi'

  export default {
    name: 'login',
    metaInfo: {
      title: 'Login'
    },
    components: {
      VuesticAlert
    },
    data () {
      return {
        userName: '',
        password: '',
        hidden: true,
        showBadCredentialsAlert: false
      }
    },

    methods: {
      doLogin: function () {
        api.post(store.getters.userSecurityEndpoint.login, {
          userName: this.userName,
          password: this.password
        })
        .then(response => {
          if (response.status === 200) {
            let token = response.data.token
            let roles = helpers.getUserRolesFromJwtToken(token)

            if (this.isAdmin(roles)) {
              helpers.setJwtTokenInCookie(token)
              this.$router.replace(this.redirectTo())
            }
          }
        })
        .catch(error => {
          let responseStatus = error.response.status
          if (responseStatus === 401) {
            this.showBadCredentialsAlert = true
          }
        })
      },

      isAdmin: function (roles) {
        for (let role of roles) {
          if (role === store.getters.roles.admin) {
            return true
          }
        }
        return false
      },
      redirectTo () {
        const { path, name } = this.$route.query
        if (path) return { path: path }
        if (name) return { name: name }
        return { name: 'Dashboard' }
      }
    },

    created () {
      if (auth.isAuthenticated()) {
        this.$router.replace(this.redirectTo())
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
