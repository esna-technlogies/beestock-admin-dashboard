import lazyLoading from './lazyLoading'

export default {
  name: 'Forms',
  meta: {
    expanded: false,
    secured: true,
    title: 'menu.forms',
    iconClass: 'vuestic-icon vuestic-icon-forms'
  },
  children: [
    {
      name: 'FormElements',
      path: '/forms/form-elements',
      component: lazyLoading('forms/form-elements/FormElements'),
      meta: {
        secured: true,
        title: 'menu.formElements'
      }
    },
    {
      name: 'Form Wizards',
      path: '/forms/form-wizard',
      component: lazyLoading('forms/form-wizard/FormWizard'),
      meta: {
        secured: true,
        title: 'menu.formWizards'
      }
    }
  ]
}

