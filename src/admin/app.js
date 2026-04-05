export default {
  config: {
    head: {
      title: 'HK Company Admin Panel',
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
        'Auth.form.welcome.title': 'Welcome to HK Company Admin Panel',
        'Auth.form.welcome.subtitle': 'Log in to manage HK Company content',
      },
    },
  },

  bootstrap() {},
};
