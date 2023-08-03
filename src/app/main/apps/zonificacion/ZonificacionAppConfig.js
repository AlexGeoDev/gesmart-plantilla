import { Navigate } from 'react-router-dom';
import ZonificacionApp from './ZonificacionApp';
import en from './i18n/en';
import es from './i18n/es';
import fr from './i18n/fr';
import i18next from 'i18next';

i18next.addResourceBundle('en', 'zonificacionApp', en);
i18next.addResourceBundle('es', 'zonificacionApp', es);
i18next.addResourceBundle('fr', 'zonificacionApp', fr);

const ZonificacionAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/zonificacion',
      element: <ZonificacionApp />,
    },
    {
      path: 'apps/zonificacion/proyecto-madrid',
      element: <ZonificacionApp />,
    },
    {
      path: 'apps/zonificacion/proyecto-villavicencio',
      element: <ZonificacionApp />,
    },
    {
      path: 'apps/zonificacion/proyecto-barcelona',
      element: <ZonificacionApp />,
    },
    {
      path: 'apps/zonificacion',
      element: <Navigate to="/apps/zonificacion" />,
    },
  ],
};

export default ZonificacionAppConfig;
