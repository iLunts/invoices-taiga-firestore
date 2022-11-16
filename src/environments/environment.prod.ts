export const environment = {
  firebase: {
    projectId: 'invoices-244bd',
    appId: '1:281478247600:web:4bce50f58c2357d55ab775',
    databaseURL: 'https://invoices-244bd.firebaseio.com',
    storageBucket: 'invoices-244bd.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyAt0A-pNJNvSe9pUWrby_2-SFQCXI7WMsE',
    authDomain: 'invoices-244bd.firebaseapp.com',
    messagingSenderId: '281478247600',
    measurementId: 'G-YDRP5ST41Z',
  },
  production: true,
  startPageAfterLogin: 'home',
  firebaseConfig: {
    apiKey: 'AIzaSyAt0A-pNJNvSe9pUWrby_2-SFQCXI7WMsE',
    authDomain: 'invoices-244bd.firebaseapp.com',
    databaseURL: 'https://invoices-244bd.firebaseio.com',
    projectId: 'invoices-244bd',
    storageBucket: 'invoices-244bd.appspot.com',
    messagingSenderId: '281478247600',
    appId: '1:281478247600:web:4bce50f58c2357d55ab775',
    measurementId: 'G-YDRP5ST41Z'
  },

  routing: {
    default: {
      home: '/'
    },
    auth: {
      login: '/auth/login',
      registration: '/auth/registration'
    },
    admin: {
      dashboard: '/admin/dashboard',
      invoice: {
        list: '/admin/invoices',
        create: '/admin/invoices/create',
        edit: '/admin/invoices/edit',
        clone: '/admin/invoices/clone'
      },
      contractor: {
        list: '/admin/contractor',
        create: '/admin/contractor/create'
      },
      contract: {
        list: '/admin/contract',
        create: '/admin/contract/create'
      },
      act: {
        list: '/admin/act',
        create: '/admin/act/create'
      },
      rentalCertificate: {
        list: '/admin/rental-certificate',
        create: '/admin/rental-certificate/create',
        edit: '/admin/rental-certificate/edit',
        clone: '/admin/rental-certificate/clone'
      },
      settings: {
        apps: '/admin/settings/apps',
        company: '/admin/settings/company',
        employees: '/admin/settings/employees',
        main: '/admin/settings',
        templates: '/admin/settings/templates',
        services: {
          list: '/admin/settings/services',
          create: '/admin/settings/services/create',
          edit: '/admin/settings/services/edit'
        }
      }
    }
  }
};
