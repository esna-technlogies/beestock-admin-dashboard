<template>
    <div class="app-alert">
      <div class="row" v-if="alertType">
        <div class="col-md-12">
          <vuestic-alert :type="alertType" :withCloseBtn="true">
            <span class="badge badge-pill" :class="'badge-' + alertType">{{ alertType | translate }}</span>
            {{ alertMessage | translate }}
            <i class="fa fa-close alert-close"></i>
          </vuestic-alert>
        </div>
      </div>
    </div>
</template>

<script>
  import VuesticAlert from '../vuestic-components/vuestic-alert/VuesticAlert'

  export default {
    name: 'app-alert',
    components: {
      VuesticAlert
    },
    props: {
      alertType: {
        type: String,
        default: ''
      },
      alertMessage: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>

</style>
