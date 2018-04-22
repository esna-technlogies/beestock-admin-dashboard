<template>
  <div class="Users">
    <main-alert v-if="alertType" :alertType="alertType" :alertMessage="alertMessage"/>

    <div class="row no-gutters justify-content-center">
      <div class="col-12">
        <widget :headerText="$t('tables.users')">
          <users-data-table
            :apiUrl="apiUrl"
            :apiMode="apiMode"
            :tableFields="tableFields"
            :itemsPerPage="itemsPerPage"
            :sortFunctions="sortFunctions"
            :paginationPath="paginationPath" />
        </widget>
      </div>
    </div>
  </div>
</template>

<script>
  import MainAlert from '../alerts/MainAlert'
  import UsersDataTable from './UsersDataTable'
  import PagePreLoader from '../loaders/PagePreLoader'
  import Widget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticAlert from '../vuestic-components/vuestic-alert/VuesticAlert'

  import FieldsDef from './data/fields-definition'
  import ItemsPerPageDef from './data/items-per-page-definition'

  import {beestockApi} from '../../config'
  import {userAccount as userAccountEndpoint} from '../../api/beestock/endpoints'


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
      MainAlert,
      VuesticAlert,
      PagePreLoader,
      UsersDataTable
    },
    data () {
      return {
        apiMode: true,
        apiUrl: beestockApi.url + userAccountEndpoint.findAll,
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
