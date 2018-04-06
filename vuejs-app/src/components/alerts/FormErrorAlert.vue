<template>
  <div class="form-error-alert">
    <vuestic-alert type="danger" class="-alert">
      <span class="badge badge-pill badge-danger">{{'notificationsPage.alerts.danger' | translate}}</span>
      {{ alertMessage }}
    </vuestic-alert>
  </div>
</template>

<script>
  export default {
    name: 'form-error-alert',
    props: {
      alertMessage: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>

</style>
