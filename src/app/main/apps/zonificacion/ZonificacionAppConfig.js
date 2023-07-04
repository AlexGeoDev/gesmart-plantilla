import { Navigate } from 'react-router-dom';
import ZonificacionApp from './ZonificacionApp';

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
