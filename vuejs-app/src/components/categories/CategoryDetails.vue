<template>

  <div>
    <div v-if="isLoading">
      <div class="content-wrap" id="content-wrap">
        <main id="content" class="content" role="main">
          <vuestic-pre-loader ref="preLoader" class="pre-loader"></vuestic-pre-loader>
        </main>
      </div>
    </div>

    <div v-if="isError">
      Error
    </div>

    <div class="category-details" v-if="isCategoryDetails">
      <div class="Set row no-gutters">
        <div class="header col-12">
          <div class="row justify-content-between">
            <div class="header-text col-md-5">
              <h2>
                <span class="mr-3">{{ categoryDetails.title }}</span>
              </h2>
              <router-link :to="{path: '/categories'}">{{'categoryDetails.back' | translate}}</router-link>
            </div>

            <div class="col-md-4 mt-2 mr-4 text-right">
              <button class="btn btn-danger btn-micro" style="font-size: 90% !important;" @click="confirmDeleteCategory()">
                <div class="btn-with-icon-content">
                  <i class="fa fa-trash"></i>
                  DELETE
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <modal
        :show.sync="showConfirmDeleteUserModal"
        ref="confirmDeleteCategoryModal"
        :okText="'modal.confirm' | translate"
        :cancelText="'modal.cancel' | translate"
        :okClass="'btn btn-danger'"
        @ok="deleteCategory">
        <div slot="title">Confirm Delete User</div>
      </modal>

      <div class="category-info row">
        <div class="col-md-12">
          <div class="widget">
            <div class="widget-header row no-gutters justify-content-between">
              <div class="col-2 text-left ma-0 pa-0">
                <div>{{ 'categoryDetails.heads.form'  | translate }}</div>
              </div>

              <div class="text-right" v-if="newChanges">
                <vue-simple-spinner
                  :speed=".8"
                  :line-size="5"
                  :line-fg-color="'#41DF7C'" v-if="savingChanges" >
                </vue-simple-spinner>

                <div style="color: #41DF7C" v-else-if="changesSaved">
                  <span class="align-middle mr-1">SAVED</span>
                  <span aria-hidden="true" class="fa fa-check-circle align-middle" style="font-size: 25px;"></span>
                </div>

                <div style="color: #CE403E" v-else>
                  <span class="align-middle mr-1">FAILED</span>
                  <span aria-hidden="true" class="fa fa-times-circle align-middle" style="font-size: 25px;"></span>
                </div>
              </div>
            </div>

            <div class="widget-body">
              <form>
                <div class="row justify-content-center">
                  <div class="col-md-8">
                    <div class="row justify-content-start">
                      <div class="col-md-6">
                        <fieldset>
                          <div class="form-group with-icon-right" :class="{'has-error': errors.has('title')}">
                            <div class="input-group">
                              <input
                                id="title"
                                name="title"
                                type="text"
                                v-model="title"
                                v-validate="'required|alpha_spaces|min:3'"
                                data-vv-delay="1"
                                required/>
                              <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                              <label class="control-label" for="title">{{'categoryDetails.form.inputs.title' | translate}}</label><i class="bar"></i>
                              <small v-show="errors.has('title')" class="help text-danger">
                                {{ errors.first('title') }}
                              </small>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row justify-content-center">
                  <div class="col-md-8">
                    <fieldset>
                      <div class="form-group with-icon-right" :class="{'has-error': errors.has('description')}">
                        <div class="input-group">
                          <input
                            id="description"
                            name="description"
                            v-model="description"
                            v-validate="'required|alpha_spaces|min:3'"
                            required/>
                          <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                          <label class="control-label" for="description">{{'categoryDetails.form.inputs.description' | translate}}</label>
                          <i class="bar"></i>
                          <small v-show="errors.has('description')" class="help text-danger">
                            {{ errors.first('description') }}
                          </small>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
import VueGallery from 'vue-gallery'
import Spinner from 'vue-simple-spinner'
import Multiselect from 'vue-multiselect'
import Modal from '../vuestic-components/vuestic-modal/VuesticModal'
import VuesticWidget from '../vuestic-components/vuestic-widget/VuesticWidget'
import VuesticPreLoader from '../vuestic-components/vuestic-preloader/VuesticPreLoader'
import VuesticSimpleSelect from '../vuestic-components/vuestic-simple-select/VuesticSimpleSelect'

import categoryService from '../../services/category'
import photoService from '../../services/photo'
import routerHelper from '../../helpers/router'

export default {
  name: 'category-details',
  metaInfo () {
    return {
      title: this.categoryDetails.title
        ? this.categoryDetails.title
        : 'Category Details'
    }
  },
  components: {
    Modal,
    Multiselect,
    VuesticWidget,
    VuesticPreLoader,
    VuesticSimpleSelect,
    'gallery': VueGallery,
    'vue-simple-spinner': Spinner
  },
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: true,
      isError: false,
      isCategoryDetails: false,
      showConfirmDeleteUserModal: true,
      title: '',
      description: '',
      categoryDetails: {
        title: '',
        description: ''
      },
      galleryIndex: null,
      newChanges: false,
      savingChanges: false,
      changesSaved: false,
      beforeUpdateTimers: {}
    }
  },
  methods: {
    deleteCategory () {
      categoryService.deleteByUUID(this.uuid)
        .then((response) => {
          routerHelper.deleteCategoryDone(response.status)
        })
        .catch((error) => {
          console.error('ERROR', error)
        })
    },
    nameWithMobileCode ({ name, mobileCode }) {
      return `${name} — [${mobileCode}]`
    },
    showCategoryDetails () {
      this.isCategoryDetails = true
      this.isLoading = false
      this.isError = false
    },
    showErrorAlert () {
      this.isError = true
      this.isLoading = false
      this.isCategoryDetails = false
    },
    fetchCategory (uuid) {
      categoryService.findByUUID(uuid)
        .then((response) => {
          this.storeCategoryDetails(response.data.category)
          this.setFormFields()
          this.showCategoryDetails()
        })
        .catch((error) => {
          routerHelper.findCategoryFailed(error.response.status)
        })
    },
    setFormFields () {
      this.title = this.categoryDetails.title
      this.description = this.categoryDetails.description
    },
    storeCategoryDetails (category) {
      this.categoryDetails.title = category.title
      this.categoryDetails.description = category.description
    },
    fetchCategoryRecentPhotos () {
      photoService.findAll({
        page: 1,
        limit: 5
      })
      .then((successResponse) => {
        this.setUserRecentPhotos(successResponse.data.photos)
      })
      .catch((errorResponse) => {
        if (errorResponse.status === 404) {
          console.error('NOT FOUND', errorResponse)
        }
      })
    },
    setUserRecentPhotos (photos) {
      this.userRecentPhotos_500.length = 0
      for (const photo of Object.values(photos)) {
        this.userRecentPhotos_500.push(photo.file_storage.sizes.size_500)
        this.userRecentPhotos_1000.push(photo.file_storage.sizes.size_1000)
      }
    },
    runSavingSpinner () {
      this.newChanges = true
      this.savingChanges = true
    },
    updateCategoryWithUpdatedField (fieldName, queryParams = {}) {
      this.stopSavingSpinner()
      this.clearBeforeUpdateTimers(fieldName)

      queryParams[fieldName] = this[fieldName]

      if (this.isFieldUpdatedWithValidValue(fieldName)) {
        this.beforeUpdateTimers[fieldName] = setTimeout(() => {
          // this.runSavingSpinner()
          //
          // this.showChangesSaved()

          // categoryService.updateByUUID(this.uuid, queryParams)
          //   .then((response) => {
          //     this.storeCategoryDetails(response.data.category)
          //     this.showChangesSaved()
          //   })
          //   .catch((error) => {
        //       this.showFailedToSaveChanges()
          //   })
        }, 1500)
      }
    },
    stopSavingSpinner () {
      this.newChanges = false
      this.savingChanges = false
    },
    showChangesSaved () {
      this.stopSavingSpinner()
      this.newChanges = true
      this.changesSaved = true
    },
    showFailedToSaveChanges () {
      this.stopSavingSpinner()
      this.newChanges = true
      this.changesSaved = false
    },
    isFieldUpdatedWithValidValue (fieldName) {
      switch (fieldName) {
        case 'title':
        case 'description':
          this.$validator.validateAll()
          return !this.errors.has(fieldName) && this.categoryDetails[fieldName] !== this[fieldName]
      }
    },
    clearBeforeUpdateTimers (fieldName) {
      clearTimeout(this.beforeUpdateTimers[fieldName])
    },
    confirmDeleteCategory () {
      this.$refs.confirmDeleteCategoryModal.open()
      // this.$refs.smallModal.open()
    }
  },

  watch: {
    '$route': 'fetchCategory',
    title () {
      this.updateCategoryWithUpdatedField('title')
    },
    description () {
      this.updateCategoryWithUpdatedField('description')
    }
  },

  created () {
    this.fetchCategory(this.uuid)
    // this.fetchCategoryRecentPhotos()
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
</style>
