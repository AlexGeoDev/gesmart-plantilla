import { Navigate } from 'react-router-dom';
import FrecuenciasApp from './FrecuenciasApp';
import en from './i18n/en';
import es from './i18n/es';
import fr from './i18n/fr';
import i18next from 'i18next';

i18next.addResourceBundle('en', 'frecuenciasApp', en);
i18next.addResourceBundle('es', 'frecuenciasApp', es);
i18next.addResourceBundle('fr', 'frecuenciasApp', fr);

const FrecuenciasAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/frecuencias',
      element: <FrecuenciasApp />,
    },
    {
      path: 'apps/frecuencias',
      element: <Navigate to="/apps/frecuencias" />,
    },
  ],
};

export default FrecuenciasAppConfig;