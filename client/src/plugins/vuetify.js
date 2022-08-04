import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import minifyTheme from 'minify-css-string';
import '@/scss/vuetify/overrides.scss';


Vue.use(Vuetify);

const theme = {
    primary: '#7c7f85',
    info: '#1e88e5',
    success: '#21c1d6',
    accent: '#fc4b6c',
    default: '#563dea',
}

export default new Vuetify({
    theme: {
      options: { minifyTheme },
        themes: {
          dark: theme,
          light: theme,
        },
      }
});
