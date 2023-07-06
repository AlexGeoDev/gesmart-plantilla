import { Navigate } from 'react-router-dom';
import VrpApp from './VrpApp';

const VrpAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/vrp',
      element: <VrpApp />,
    },
    {
      path: 'apps/vrp',
      element: <Navigate to="/apps/vrp" />,
    },
  ],
};

export default VrpAppConfig;