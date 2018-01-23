<template>
  <div class="Users">

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
  import Widget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import DataTable from './UsersDataTable'
  import FieldsDef from './users-datatable/data/fields-definition'
  import ItemsPerPageDef from './users-datatable/data/items-per-page-definition'

  export default {
    name: 'Users',
    metaInfo: {
      title: 'Users'
    },
    components: {
      'users-data-table': DataTable,
      Widget
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
