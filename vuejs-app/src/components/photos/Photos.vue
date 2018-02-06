<template>
  <div class="photos">
    <div class="row" v-if="alertType">
      <div class="col-md-12">
        <vuestic-alert :type="alertType" :withCloseBtn="true">
          <span class="badge badge-pill" :class="'badge-' + alertType">{{ alertType | translate }}</span>
          {{ alertMessage | translate }}
          <i class="fa fa-close alert-close"></i>
        </vuestic-alert>
      </div>
    </div>

    <div class="Set row">
      <div class="col-md-12">
        <div class="widget">
          <div class="widget-header row no-gutters justify-content-between">
            <div class="col-4 text-left ma-0 pa-0">
              <div>
                <span>{{ 'tables.photos'  | translate }}</span>

                <vue-simple-spinner v-if="isLoadingPhotos"
                  :class="'d-inline-block align-middle ml-2'"
                  :size="22"
                  :speed=".5"
                  :line-size="3"
                  :line-fg-color="'#41DF7C'">
                </vue-simple-spinner>
              </div>
            </div>
          </div>

          <div class="widget-body">
            <div class="row no-gutters mb-4 justify-content-center">
              <vuetable-pagination ref="pagination"
                                   :css="css.pagination.micro"
                                   :onEachSide="onEachSide"
                                   @vuetable-pagination:change-page="onChangePage">
              </vuetable-pagination>
            </div>

            <div class="row justify-content-start">
              <figure class="figure col-md-6 col-l-6 col-xl-4 text-left" v-for="(photo, photoIndex) in photoList">
                <div class="image-wrapper">
                  <div :key="photoIndex"
                       :style="{ backgroundImage: 'url(' + photo.url + ')' }"
                       class="image col img-fluid">

                    <div class="top-information top-left">
                      <span class="category-name btn btn-micro btn-warning" @click="routeToCategoryDetails(photoList[photoIndex].category.uuid)">
                          {{ photo.category.name }}
                      </span>
                    </div>

                    <div class="centered" v-if="!loadedPhotoIndexList.includes(photoIndex)">
                      <vue-simple-spinner></vue-simple-spinner>
                    </div>

                    <div class="bottom-information row no-gutters justify-content-between">
                      <span class="btn-link fullname text-left" @click="routeToUserDetails(photoList[photoIndex].user.uuid)">
                        {{ photo.user.fullName }}
                      </span>
                      <span class="created-at text-right">{{ photo.created | moment("MMM, Do YYYY") }}</span>
                    </div>
                  </div>

                  <div class="photo-information">
                    <div>
                      <span class="title" @click="routeToPhotoDetails(photo.uuid)">{{ photo.title }}</span>
                    </div>
                    <div class="description">
                      <span>{{ photo.description }}</span>
                    </div>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import VuesticWidget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import DataTableStyles from '../users/data/data-table-styles'
  import VuesticProfileCard from '../vuestic-components/vuestic-profile-card/VuesticProfileCard'
  import truncate from 'vue-truncate-collapsed'
  import Spinner from 'vue-simple-spinner'


  import userService from '../../services/user'
  import photoService from '../../services/photo'
  import categoryService from '../../services/category'
  import VuesticAlert from '../vuestic-components/vuestic-alert/VuesticAlert'

  export default {
    name: 'photos',
    metaInfo () {
      return {
        title: 'Photos'
      }
    },
    components: {
      truncate,
      VuesticAlert,
      VuesticWidget,
      VuetablePagination,
      VuesticProfileCard,
      'vue-simple-spinner': Spinner
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
        css: DataTableStyles,
        onEachSide: 1,
        currentPage: 1,
        perPage: 30,
        paginationData: {},
        isLoadingPhotos: true,
        photoList: [],
        loadedPhotoList: [],
        loadedPhotoIndexList: []
      }
    },
    methods: {
      async fetchAndRenderPhotos () {
        this.isLoadingPhotos = true

        const response = await this.fetchPhotos()
        await this.setPaginationData(response.data)

        const photos = await response.data.photos
        await this.renderPhotos(Object.values(photos))

        this.isLoadingPhotos = false

        this.renderPhotosRelatedInfo()
      },
      fetchPhotos () {
        return photoService.findAll({ page: this.currentPage, limit: this.perPage })
          .then(response => response)
          .catch(error => console.error('ERROR', error))
      },
      renderPhotos (photos) {
        this.photoList = []
        this.loadedPhotoIndexList = []

        for (let photoIndex = 0; photoIndex < photos.length; photoIndex++) {
          const photo = photos[photoIndex]

          this.photoList[photoIndex] = {
            uuid: photo.uuid,
            title: photo.title,
            description: photo.description,
            url: photo.file_storage.sizes.size_500,
            keywords: photo.keywords,
            created: new Date(photo.created.sec).toISOString(),
            user: {
              uuid: photo.user
            },
            category: {
              uuid: photo.category
            }
          }
        }
      },
      async renderPhotosRelatedInfo () {
        for (let photoIndex = 0; photoIndex < this.photoList.length; photoIndex++) {
          if (this.isLoadingPhotos) break

          const userUUID = this.photoList[photoIndex].user.uuid
          const categoryUUID = this.photoList[photoIndex].category.uuid

          await Promise.all([
            photoService.fetchPhotoUser(userUUID),
            photoService.fetchPhotoCategory(categoryUUID)
          ])
            .then(responses => {
              this.updatePhotoUserFullName(photoIndex, responses[0].full_name)
              this.updatePhotoCategoryName(photoIndex, responses[1].title)
            })
            .finally(() => {
              this.loadedPhotoIndexList.push(photoIndex)
            })
        }
      },
      fetchPhotoUser (photoIndex) {
        const userUUID = this.photoList[photoIndex].user.uuid
        return userService.findByUUID(userUUID).then(response => response.data.user)
      },
      fetchPhotoCategory (photoIndex) {
        const categoryUUID = this.photoList[photoIndex].category.uuid
        return categoryService.findByUUID(categoryUUID).then(response => response.data.category)
      },
      updatePhotoUserFullName (photoIndex, userFullName) {
        this.photoList[photoIndex].user.fullName = userFullName
      },
      updatePhotoCategoryName (photoIndex, categoryName) {
        this.photoList[photoIndex].category.name = categoryName
      },
      setPaginationData (data) {
        this.paginationData = this.getPaginationData(data)
        this.$refs.pagination.setPaginationData(this.paginationData)
      },
      getPaginationData (data) {
        let last = data._links.last ? data._links.last.href : data._links.self.href
        let lastPage = parseInt(last.match(/page=\d+/i)[0].replace('page=', ''))
        let total = lastPage * this.perPage
        let currentPage = data._links.self.page_number

        return {
          total: total,
          per_page: this.perPage,
          current_page: currentPage,
          last_page: lastPage,
          next_page_url: data._links.next ? data._links.next.href : null,
          prev_page_url: data._links.prev ? data._links.prev.href : null,
          from: (currentPage - 1) * this.perPage + 1,
          to: Math.min(currentPage * this.perPage, total)
        }
      },
      onChangePage (page) {
        this.changePage(page)
      },
      changePage (page) {
        if (page === 'prev') {
          this.gotoPreviousPage()
        } else if (page === 'next') {
          this.gotoNextPage()
        } else {
          this.gotoPage(page)
        }
      },
      gotoPreviousPage () {
        if (this.currentPage > 1) {
          this.currentPage--
          this.fetchAndRenderPhotos()
        }
      },
      gotoNextPage () {
        if (this.currentPage < this.paginationData.last_page) {
          this.currentPage++
          this.fetchAndRenderPhotos()
        }
      },
      gotoPage (page) {
        if (page !== this.currentPage && (page > 0 && page <= this.paginationData.last_page)) {
          this.currentPage = page
          this.fetchAndRenderPhotos()
        }
      },
      routeToCategoryDetails (uuid) {
        this.$router.push({ name: 'CategoryDetails', params: { uuid } })
      },
      routeToUserDetails (uuid) {
        this.$router.push({ name: 'UserDetails', params: { uuid } })
      },
      routeToPhotoDetails (uuid) {
        this.$router.push({ name: 'PhotoDetails', params: { uuid } })
      }
    },
    created () {
      this.fetchAndRenderPhotos()
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

  .image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: inherit;
    border: 2px solid #EBEBEB;
    border-bottom: 0;
    height: 10rem;
  }


  .figure {
    position: relative;
    text-align: center;
    color: white;
  }

  .bottom-information {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 18%;
    font-weight: 400;

    .fullname {
      top: .4rem;
      left: .7rem;
      font-size: 85%;
      position: absolute;
      cursor: pointer;
    }

    .created-at {
      top: .5rem;
      right: .7rem;
      font-size: 70%;
      position: absolute;
    }
  }

  .top-information {
    top: 0;
    left: 0;
    width: 100%;
    height: 18%;
    font-weight: 400;
    padding: 0 .7rem .2rem .7rem;
    position: absolute;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.4);

    .category-name {
      color: black;
      border-radius: .4rem;
      padding: 0.13rem .3rem 0.13rem .5rem;
    }

    .zoom-in {
      top: .3rem;
      right: .7rem;
      position: absolute;
    }
  }

  .btn-micro {
    font-size: 70% !important;
  }

  .top-right {
    position: absolute;
    top: 8px;
    right: 22px;
  }

  .bottom-right {
    position: absolute;
    bottom: 23px;
    right: 22px;
  }

  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .image-wrapper {
    padding: 0;
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
    box-shadow: 0px 5px 50px -20px #595959;
  }

  .photo-information {
    min-height: 5rem;
    padding: .5rem .7rem;
    background-color: white;
    border: 2px solid #EBEBEB;
    border-top: 0;
    font-family: 'Source Sans Pro', sans-serif;

    .title {
      color: #2B2B2B;
    }

    .title:hover {
      color: #6f6665;
      cursor: pointer;
      text-decoration: underline;
    }

    .description {
      color: #706666;
      font-size: .9em;
    }
  }

  .hidden {
    display: none
  }
</style>
