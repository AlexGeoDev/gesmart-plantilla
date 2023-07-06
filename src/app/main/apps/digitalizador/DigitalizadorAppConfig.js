import { Navigate } from 'react-router-dom';
import DigitalizadorApp from './DigitalizadorApp';

const DigitalizadorAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/digitalizador',
      element: <DigitalizadorApp />,
    },
    {
      path: 'apps/digitalizador',
      element: <Navigate to="/apps/digitalizador" />,
    },
  ],
};

export default DigitalizadorAppConfig;