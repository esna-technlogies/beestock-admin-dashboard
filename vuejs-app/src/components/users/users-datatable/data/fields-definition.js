export default {
  tableFields: [
    {
      name: 'full_name',
      title: 'Full Name'
    },
    {
      name: 'email',
      title: 'Email Address'
    },
    {
      name: 'mobile_number.international_number_for_calling',
      title: 'Mobile Number'
    },
    {
      name: 'country',
      title: 'Country'
    }
  ],
  sortFunctions: {
    'full_name': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'email': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}
