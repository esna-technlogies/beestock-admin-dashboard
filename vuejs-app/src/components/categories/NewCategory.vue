<template>
    <div class="new-category">
      <div class="category-info row">
        <div class="col-md-12">
          <div class="widget">
            <div class="widget-header row no-gutters justify-content-between">
              <div class="col-2 text-left ma-0 pa-0">
                <div>{{ 'newCategory.heads.form'  | translate }}</div>
              </div>
            </div>

            <div class="widget-body">
              <form v-on:submit.prevent="validateBeforeSubmit()">
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

                <div class="row justify-content-center">
                  <div class="col-md-3">
                    <button type="button" class="btn btn-danger btn-sm btn-block rounded-0" @click="cancel()">Cancel</button>
                  </div>
                  <div class="col-md-3">
                    <button type="submit" class="btn btn-primary btn-sm btn-block rounded-0" >Add</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  import categoryService from '../../services/category'
  import routerHelper from '../../helpers/router'

  export default {
    name: 'new-category',
    metaInfo: {
      title: 'New Category'
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
      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.addCategory()
          }
        })
      },
      addCategory () {
        const queryParams = {
          title: this.title,
          description: this.description
        }

        categoryService.create(queryParams)
          .then((response) => {
            routerHelper.addCategoryDone(response.status)
          })
          .catch((error) => {
            console.error(error)
          })
      },
      cancel () {
        this.$router.push({ name: 'Categories' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";
  @import "../../sass/_variables.scss";
  @import '../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import '../../../node_modules/bootstrap/scss/variables';

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

  /*.btn.btn-micro {*/
    /*padding: 0.5rem 1.2rem 0.4rem 1.2rem;*/
  /*}*/
</style>
