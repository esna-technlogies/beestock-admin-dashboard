<template>
  <div class="Users">
    <div class="row" v-if="alertType">
      <div class="col-md-12">
        <vuestic-alert :type="alertType" :withCloseBtn="true">
          <span class="badge badge-pill" :class="'badge-' + alertType">{{ alertType | translate }}</span>
          {{ alertMessage | translate }}
          <i class="fa fa-close alert-close"></i>
        </vuestic-alert>
      </div>
    </div>

      <div class="row">
        <div class="col-md-12">
          <widget :headerText="$t('tables.users')">
            <users-data-table :apiUrl="apiUrl"
                        :tableFields="tableFields"
                        :itemsPerPage="itemsPerPage"
                        :sortFunctions="sortFunctions"
                        :apiMode="apiMode"
                        :paginationPath="paginationPath"></users-data-table>
          </widget>
        </div>
      </div>
  </div>
</template>

<script>
  import UsersDataTable from './UsersDataTable'
  import FieldsDef from './users-datatable/data/fields-definition'
  import Widget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticAlert from '../vuestic-components/vuestic-alert/VuesticAlert'
  import ItemsPerPageDef from './users-datatable/data/items-per-page-definition'

  export default {
    name: 'Users',
    metaInfo: {
      title: 'Users'
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
    },
    components: {
      Widget,
      VuesticAlert,
      UsersDataTable
    },
    data () {
      return {
        apiUrl: 'http://api.beesstock.com/api/user-service/user',
        apiMode: true,
        tableFields: FieldsDef.tableFields,
        itemsPerPage: ItemsPerPageDef.itemsPerPage,
        sortFunctions: FieldsDef.sortFunctions,
        paginationPath: ''
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
</style>
