<template>
  <div class="Categories">
    <main-alert v-if="alertType" :alertType="alertType" :alertMessage="alertMessage"/>

    <div class="Set row no-gutters">
      <div class="col-12">
          <div class="widget">
            <div class="widget-header row no-gutters justify-content-between">
              <div class="col-3 text-left ma-0 pa-0">
                <div>{{ 'tables.categories'  | translate }}</div>
              </div>

              <div class="col-1 text-right">
                <router-link
                  :to="{ name: 'NewCategory' }"
                  tag="button"
                  class="btn btn-primary btn-micro btn-with-icon rounded-icon" style="font-size: 90% !important;">
                    <div class="btn-with-icon-content">
                      <i class="glyphicon glyphicon-plus" style="font-size: 1rem; padding: 0.3rem 0.3rem"></i>
                    </div>
                </router-link>
              </div>
            </div>

            <div class="widget-body">
              <categories-data-table
                :apiUrl="apiUrl"
                :apiMode="apiMode"
                :tableFields="tableFields"
                :itemsPerPage="itemsPerPage"
                :sortFunctions="sortFunctions"
                :paginationPath="paginationPath" />
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MainAlert from '../alerts/MainAlert'
  import CategoriesDataTable from './CategoriesDataTable'
  import Widget from '../vuestic-components/vuestic-widget/VuesticWidget'

  import FieldsDef from './data/fields-definition'
  import ItemsPerPageDef from './data/items-per-page-definition'

  import {beestockApi} from '../../config'
  import {category as categoryEndpoint} from '../../api/beestock/endpoints'

  export default {
    name: 'categories',
    metaInfo: {
      title: 'Categories'
    },
    components: {
      Widget,
      MainAlert,
      CategoriesDataTable
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
    data () {
      return {
        apiMode: true,
        apiUrl: beestockApi.url + categoryEndpoint.findAll,
        tableFields: FieldsDef.tableFields,
        itemsPerPage: ItemsPerPageDef.itemsPerPage,
        sortFunctions: FieldsDef.sortFunctions,
        paginationPath: ''
      }
    },
    methods: {
      newCategory () {
        this.$router.push({name: 'NewCategory'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";
  @import "../../sass/_variables.scss";
  @import '../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import '../../../node_modules/bootstrap/scss/variables';

  .Set{
    .header {
      background-color: white;
      padding: 1.75rem 0 1.125rem 0;

      .header-text {
        text-align: left;
        padding-left: 2.5rem;
        h2 {
          margin-bottom: 0;
        }
      }

      .search {
        display: flex;
        align-items: center;
        justify-content: center;
        .input-group {
          width: 13.25rem;
        }
      }

      .range {
        .vue-slider-wrap {
          width: 9.3rem !important;
          .vue-slider-process {
            background-color: $brand-primary;
          }
          .vue-slider-tooltip {
            background-color: $brand-primary;
            border-color: $brand-primary;
          }
          .vue-slider-dot {
            background-color: $brand-primary;
            box-shadow: none;
          }
        }

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        h2, h4 {
          margin: .5rem;
        }
      }

      margin-bottom: 2rem;
    }

    .row {
      .icon-grid-container {
        padding-right: .625rem;
        padding-left: .625rem;
        margin: 0 0 .5rem;
        text-align: center;
        height: 6rem;
        position: relative;
        min-height: 1px;
        float: left;

        &:hover {
          background-color: $brand-primary;
          color: white;
          cursor: pointer;
        }
        .icon {
          padding: 1rem 0 0;
          margin: 0 0 .5rem;
          .iconText {
            font-size: .6rem;
            text-align: center;
          }
        }
      }
    }
  }


  .widget {
    background: $widget-bg;
    box-shadow: $widget-box-shadow;
    margin-bottom: $widget-mb;
    padding: 0;

    &.no-header {
      .widget-body {
        height: $widget-body-no-header-height;
      }
    }

    &.larger-padding {
      .widget-body {
        padding: $widget-larger-padding;
      }
    }

    &.no-h-padding {
      .widget-body {
        padding-left: 0;
        padding-right: 0;
      }
    }

    &.no-v-padding {
      .widget-body {
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    &.brand-info {
      background-color: $brand-info;
      color: $white;
      box-shadow: $widget-info-shadow;
    }

    &.brand-danger {
      background-color: $brand-danger;
      color: $white;
      box-shadow: $widget-danger-shadow;
    }

    &.info-widget {
      border-top: $info-widget-border;

      &.brand-info {
        border-top-color: $brand-info;
      }

      &.brand-danger {
        border-top-color: $brand-danger;
      }
    }

    .widget-body {
      height: $widget-body-with-header-height;
      padding: $widget-padding;
    }

    .widget-header {
      height: $widget-header-height;
      padding: 0 $widget-padding;
      border-bottom: $widget-header-border;
      font-size: $font-size-larger;
      font-weight: 600;
      display: flex;
      align-items: center;
    }
  }

  .vue-js-switch#toggle-status {
    font-size: 16px;
    margin-top: .5em;
  }

  .widget-header {
    height: 4rem !important;
  }

  .btn-micro {
    font-size: 65% !important;
  }

  .image {
    /*float: left;*/
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    /*margin: 5px;*/
    height: 250px
  }

  .badge {
    min-width: 4rem;
    display: inline-block;
    font-weight: bold;
    text-transform: uppercase;
    font-size: .7rem;
    letter-spacing: .1rem;
    padding: 0.2rem .7rem;
  }

  .btn.btn-micro {
    padding: 0.5rem 1.2rem 0.4rem 1.2rem;
  }

  .color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
  }
</style>
