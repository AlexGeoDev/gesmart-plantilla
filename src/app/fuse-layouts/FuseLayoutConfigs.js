import i18next from 'i18next';
import layout1 from './layout1/Layout1Config';
import layout2 from './layout2/Layout2Config';
import layout3 from './layout3/Layout3Config';
import en from './i18n/en';
import es from './i18n/es';
import fr from './i18n/fr';

i18next.addResourceBundle('en', 'fuseApp', en);
i18next.addResourceBundle('es', 'fuseApp', es);
i18next.addResourceBundle('fr', 'fuseApp', fr);

const FuseLayoutConfigs = {
  layout1,
  layout2,
  layout3,
};

export default FuseLayoutConfigs;
