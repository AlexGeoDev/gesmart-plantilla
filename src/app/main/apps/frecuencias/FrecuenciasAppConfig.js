import { Navigate } from 'react-router-dom';
import FrecuenciasApp from './FrecuenciasApp';

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