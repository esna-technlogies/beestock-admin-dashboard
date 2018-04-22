<template>
    <div class="photo-details">
      <div v-if="isLoading">
        <div class="content-wrap" id="content-wrap">
          <main id="content" class="content" role="main">
            <vuestic-pre-loader ref="preLoader" class="pre-loader"></vuestic-pre-loader>
          </main>
        </div>
      </div>

      <div class="photo-details" v-if="isPhotoDetails">
        <div class="Set row no-gutters">
          <div class="header col-12">
            <div class="row justify-content-between">
              <div class="header-text col">
                <h2>
                  <span class="mr-3">{{ photoDetails.title }}</span>
                </h2>
                <router-link :to="{ name: 'Photos' }">{{'photoDetails.back' | translate}}</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="photo-details row">
          <div class="col-md-12">
            <div class="widget">
              <div class="widget-header row no-gutters justify-content-between">
                <div class="col-2 text-left ma-0 pa-0">
                  <div>{{ 'photoDetails.heads.details'  | translate }}</div>
                </div>
              </div>

              <div class="widget-body">
                  <div class="row justify-content-center">
                    <div class="col-md-10">
                      <h4>{{ photoDetails.description }}</h4>
                    </div>

                    <div class="col-md-10">
                      <img :src="photoDetails.url" alt="photo">
                    </div>

                    <div class="col-md-10 mt-2">
                      <div class="row justify-content-between">
                        <div class="col-md-3 fullname" @click="routeToUserDetails(photoDetails.user.uuid)">
                          <span aria-hidden="true" class="vuestic-icon vuestic-icon-user"></span>
                          <span>{{ photoDetails.user.fullName }}</span>
                        </div>

                        <div class="col-md-3 created-at text-right">
                          <span>{{ photoDetails.created | moment("MMM, Do YYYY") }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row justify-content-center">

                    <div class="col-md-8">
                    </div>
                  </div>

                  <div class="row justify-content-center">
                    <div class="col-md-4">
                    </div>

                    <div class="col-md-4">
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import VuesticPreLoader from '../vuestic-components/vuestic-preloader/VuesticPreLoader'

  import photoService from '../../services/photo'
  import routerHelper from '../../helpers/router'

  export default {
    name: 'photo-details',
    metaInfo () {
      return {
        title: this.photoDetails.title ? this.photoDetails.title : 'Photo Details'
      }
    },
    components: {
      VuesticPreLoader
    },
    props: {
      uuid: String
    },
    data () {
      return {
        isLoading: true,
        isError: false,
        isPhotoDetails: false,
        showConfirmDeletePhotoModal: true,
        title: '',
        description: '',
        url: '',
        keywords: [],
        user: {},
        category: {},
        photoDetails: {
          title: '',
          description: '',
          url: '',
          keywords: [],
          user: {},
          category: {}
        },
        galleryIndex: null,
        newChanges: false,
        savingChanges: false,
        changesSaved: false,
        beforeUpdateTimers: {}
      }
    },
    methods: {
      async fetchPhoto (uuid) {
        photoService.findByUUID(uuid)
          .then(async (response) => {
            const photo = response.data.photo

            const photoUser = await photoService.fetchPhotoUser(photo.user)
              .then(user => {
                return {
                  uuid: user.uuid,
                  fullName: user.full_name
                }
              })

            const photoCategory = await photoService.fetchPhotoCategory(photo.category)
              .then(category => {
                return {
                  uuid: category.uuid,
                  name: category.title
                }
              })

            this.storePhotoDetails(photo, photoUser, photoCategory)
            this.showPhotoDetails()
          })
          .catch(error => {
            routerHelper.findPhotoFailed(error.response.status)
          })
      },
      storePhotoDetails (photo, photoUser, photoCategory) {
        this.photoDetails.uuid = photo.uuid
        this.photoDetails.title = photo.title
        this.photoDetails.description = photo.description
        this.photoDetails.url = photo.file_storage.sizes.size_750
        this.photoDetails.keywords = photo.keywords
        this.photoDetails.created = new Date(photo.created.sec).toISOString()
        this.photoDetails.user = photoUser
        this.photoDetails.category = photoCategory
      },
      showPhotoDetails () {
        this.isPhotoDetails = true
        this.isLoading = false
        this.isError = false
      },
      routeToUserDetails (uuid) {
        this.$router.push({ name: 'UserDetails', params: { uuid } })
      },
      routeToPhotoDetails (uuid) {
        this.$router.push({ name: 'PhotoDetails', params: { uuid } })
      }
    },
    created () {
      this.fetchPhoto(this.uuid)
      // this.fetchUserRecentPhotos()
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
  }

  .fullname {
    cursor: pointer;
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
      cursor: pointer;
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
