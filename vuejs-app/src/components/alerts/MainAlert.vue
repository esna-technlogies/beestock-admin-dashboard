<template>
  <div class="main-alert">
    <div class="row">
      <div class="col-md-12">
        <vuestic-alert :type="alertType" :withCloseBtn="true" :class="'justify-content-center'">
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
    name: 'main-alert',
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

<style lang="scss" scoped>

</style>
