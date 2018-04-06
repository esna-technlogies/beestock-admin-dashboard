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
              dataPath="categories"
              :appendParams="moreParams"
              :perPage="perPage"
              track-by="uuid"
              @vuetable:row-clicked="rowClicked"
              @vuetable:pagination-data="onPaginationData">
    </vuetable>

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
  </div>
</template>

<script>
  import Vue from 'vue'
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import LocalData from './data/local-data'
  import DataTableStyles from './data/data-table-styles'
  import FilterBar from './datatable-components/FilterBar.vue'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import ItemsPerPage from './datatable-components/ItemsPerPage.vue'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

  // import helpers from '../../helpers/index'
  //
  const defaultPerPage = 10
  const originalData = LocalData.data

  export default {
    name: 'categories-data-table',
    components: {
      Vuetable,
      FilterBar,
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
      categories: {
        type: Object
      },
      sortFunctions: {
        type: Object
      }
    },
    data () {
      return {
        rows: originalData,
        tableData: LocalData,
        perPage: defaultPerPage,
        colorClasses: {},
        moreParams: {
          limit: defaultPerPage
        },
        dataCount: 0,
        css: DataTableStyles,
        httpOptions: {
          headers: {
            // 'Authorization': 'Bearer ' + helpers.getTokenValueFromCookie()
            'Authorization': 'Bearer ' + ''
          }
        }
      }
    },
    methods: {
      rowClicked (payload) {
        console.log('payload', payload)
        const categoryUUID = payload.uuid
        if (categoryUUID) {
          const direction = {
            name: 'CategoryDetails',
            params: {
              uuid: categoryUUID
            }
          }
          this.$router.push(direction)
        } else {
          console.error(`ERROR: Category with uuid '${categoryUUID}' is not found`)
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
        console.log('paginationData', paginationData)
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)
      },
      onChangePage (page) {
        console.log('onChangePage', page)
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

        transformed.categories = []

        for (const uuid of Object.keys(data.categories)) {
          const category = data.categories[uuid]
          transformed['categories'].push({
            uuid: category.uuid,
            title: category.title,
            description: category.description
          })
        }

        return transformed
      }
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
