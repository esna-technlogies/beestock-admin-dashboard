<template>
  <div class="Users">

      <div class="row">
        <div class="col-md-12">
          <widget :headerText="$t('tables.users')">
            <data-table :apiUrl="apiUrl"
                        :tableFields="tableFields"
                        :itemsPerPage="itemsPerPage"
                        :sortFunctions="sortFunctions"
                        :apiMode="apiMode"
                        :paginationPath="paginationPath"></data-table>
          </widget>
        </div>
      </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Widget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import DataTable from './users-datatable/UsersDataTable'
  import BadgeColumn from './BadgeColumn.vue'
  import Vue from 'vue'
  import FieldsDef from './users-datatable/data/fields-definition'
  import ItemsPerPageDef from './users-datatable/data/items-per-page-definition'

  Vue.component('badge-column', BadgeColumn)

  export default {
    name: 'Users',
    components: {
      DataTable,
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
