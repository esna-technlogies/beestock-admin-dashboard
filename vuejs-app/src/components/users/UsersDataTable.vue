<template>
  <div class="table-responsive">
    <div class="d-flex flex-md-row flex-column justify-content-md-between align-items-center">
      <filter-bar @filter="onFilterSet"></filter-bar>

      <items-per-page :options="itemsPerPage"
                      :defaultPerPage="perPage"
                      @items-per-page="onItemsPerPage"></items-per-page>
    </div>

    <vuetable ref="vuetable"
              :apiUrl="apiUrl"
              :apiMode="apiMode"
              :fields="tableFields"
              :httpOptions="httpOptions"
              :data="tableData"
              :dataTotal="dataCount"
              :dataManager="dataManager"
              :css="css.table"
              dataPath="users"
              :appendParams="moreParams"
              :perPage="perPage"
              track-by="uuid"
              @vuetable:row-clicked="rowClicked"
              @vuetable:pagination-data="onPaginationData"
              @vuetable:load-success="tableDataLoaded" />

    <div class="row no-gutters well justify-content-between">
      <div class="col">
          <vuetable-pagination-info :class="'mt-2'" ref="paginationInfo"></vuetable-pagination-info>
      </div>

      <div class="col text-right">
        <vuetable-pagination ref="pagination"
                             :css="css.pagination.micro"
                             :onEachSide="onEachSide"
                             @vuetable-pagination:change-page="onChangePage">
        </vuetable-pagination>
      </div>
    </div>

    <basic-loader v-show="isLoading" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import LocalData from './data/local-data'
  import BasicLoader from '../loaders/BasicLoader'
  import DataTableStyles from './data/data-table-styles'
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import FilterBar from './datatable-components/FilterBar.vue'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import ItemsPerPage from './datatable-components/ItemsPerPage.vue'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

  import utils from '../../services/utils'
  import CountriesList from './data/country-list'

  const defaultPerPage = 10
  const originalData = LocalData.data

  export default {
    name: 'users-data-table',
    components: {
      Vuetable,
      FilterBar,
      BasicLoader,
      ItemsPerPage,
      VuetablePagination,
      VuetablePaginationInfo
    },
    props: {
      apiUrl: {
        type: String
      },
      tableFields: {  // This hold the names of table columns
        type: Array,
        required: true
      },
      itemsPerPage: {
        type: Array,
        required: true
      },
      onEachSide: {
        type: Number,
        default () {
          return 2
        }
      },
      apiMode: {
        type: Boolean,
        default () {
          return true
        }
      },
      users: {
        type: Object
      },
      data: {
        type: Array
      },
      sortFunctions: {
        type: Object
      },
      paginationPath: {
        type: String,
        default () {
          return 'pagination'
        }
      }
    },
    data () {
      return {
        isLoading: true,
        rows: originalData,
        tableData: LocalData,
        perPage: defaultPerPage,
        colorClasses: {},
        dataCount: 0,
        css: DataTableStyles,
        moreParams: {
          limit: defaultPerPage
        },
        httpOptions: {
          headers: {
            'Authorization': 'Bearer ' + utils.getCurrentUserJwtToken()
          }
        }
      }
    },
    methods: {
      rowClicked (payload) {
        const userUUID = payload.uuid
        if (userUUID) {
          const direction = {
            name: 'UserDetails',
            params: {
              uuid: userUUID
            }
          }
          this.$router.push(direction)
        } else {
          console.error(`ERROR: User with uuid '${userUUID}' is not found`)
        }
      },
      onFilterSet (filterText) {
        if (this.apiMode) {
          this.moreParams = {
            'filter': filterText
          }
        } else {
          const txt = new RegExp(filterText, 'i')
          this.tableData.data = originalData.filter(function (item) {
            return item.name.search(txt) >= 0 || item.email.search(txt) >= 0
          })
        }
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      onItemsPerPage (itemsPerPageValue) {
        this.perPage = itemsPerPageValue
        this.moreParams.limit = itemsPerPageValue
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      dataManager (sortOrder, pagination) {
        let data = this.tableData.data
        let sortFunctions = this.sortFunctions

        if (sortOrder.length > 0) {
          data.sort(function (item1, item2) {
            const sortField = sortOrder[0].sortField
            let fn = sortFunctions[sortField]
            if (fn) {
              return fn(item1[sortField], item2[sortField])
            }
          })

          if (sortOrder[0].direction === 'desc') {
            data.reverse()
          }
        }

        pagination = this.$refs.vuetable.makePagination(data.length)

        return {
          pagination: pagination,
          data: data.slice(pagination.from - 1, pagination.to)
        }
      },
      transform (data) {
        let last = data._links.last ? data._links.last.href : data._links.self.href
        let lastPage = parseInt(last.match(/page=\d+/i)[0].replace('page=', ''))
        let total = lastPage * this.perPage
        let currentPage = data._links.self.page_number

        const transformed = { links: {} }

        transformed.links.pagination = {
          total: total,
          per_page: this.perPage,
          current_page: currentPage,
          last_page: lastPage,
          next_page_url: data._links.next ? data._links.next.href : null,
          prev_page_url: data._links.prev ? data._links.prev.href : null,
          from: (currentPage - 1) * this.perPage + 1,
          to: Math.min(currentPage * this.perPage, total)
        }

        transformed.users = []

        for (const uuid of Object.keys(data.users)) {
          const user = data.users[uuid]
          transformed['users'].push({
            uuid: user.uuid,
            full_name: user.full_name,
            email: user.email,
            mobile_number: user.mobile_number.international_number_for_calling,
            country: CountriesList.filter((country) => {
              return country.abbr === user.country
            })[0].name
          })
        }

        return transformed
      },
      tableDataLoaded () {
        this.stopLoading()
      },
      startLoading () {
        this.isLoading = true
      },
      stopLoading () {
        this.isLoading = false
      }
    },
    created () {
      this.startLoading()
    }
  }
</script>

<style lang="scss">
  @import "../../sass/variables";

  @media (max-width: 1258px) {
    .pagination-link-btn:first-child, .pagination-link-btn:last-child {
      display: none;
    }

    .pagination-link-btn:nth-child(2) {
      border-top-left-radius: $btn-border-radius !important;
      border-bottom-left-radius: $btn-border-radius !important;
    }

    .pagination-link-btn:nth-last-child(2) {
      border-top-right-radius: $btn-border-radius !important;
      border-bottom-right-radius: $btn-border-radius !important;
    }
  }

  @media (max-width: 576px) {
    .hide-not-focused-btn:not(.focus) {
      display: none;
    }
  }

  .well {
    padding: .5rem 3rem .5rem 1.6rem
  }
</style>
