export default {
  config: {
    head: {
      title: 'HK Company Admin Panel',
    },
    auth: {
      logo: null,
    },
    menu: {
      logo: null,
    },
    tutorials: false,
    notifications: {
      releases: false,
    },
    theme: {
      light: {
        colors: {
          primary100: '#dbeafe',
          primary200: '#bfdbfe',
          primary500: '#2563eb',
          primary600: '#1d4ed8',
          primary700: '#1e40af',
          buttonPrimary500: '#2563eb',
          buttonPrimary600: '#1d4ed8',
          danger500: '#ef4444',
          danger600: '#dc2626',
          neutral0: '#ffffff',
          neutral100: '#f8fafc',
          neutral150: '#f1f5f9',
          neutral200: '#e2e8f0',
          neutral1000: '#0f172a',
        },
      },
      dark: {
        colors: {
          primary600: '#2563eb',
          danger600: '#ef4444',
        },
      },
    },
    translations: {
      en: {
        'global.appName': 'HK Company',
        'Auth.form.welcome.title': 'Welcome to HK Company Admin Panel',
        'Auth.form.welcome.subtitle': 'Log in to manage HK Company content',
        'Auth.form.button.login.strapi': 'Log in',
        'app.components.LeftMenu.navbrand.title': 'HK Company',
        'HomePage.header.title': 'HK Company Dashboard',
        'HomePage.header.subtitle': 'Manage products, clients, and operations in one place.',
      },
    },
  },

  bootstrap() {},
};
