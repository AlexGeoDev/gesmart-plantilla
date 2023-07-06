import { Navigate } from 'react-router-dom';
import AppsDialog from './appsDialog';

const AppsDialogConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/zonificacion',
      element: <AppsDialog />,
    },
    {
      path: 'apps',
      element: <Navigate to="/apps/zonificaion" />,
    },
  ],
};

export default AppsDialogConfig;