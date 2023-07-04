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
      path: 'apps',
      element: <AppsDialog />,
    },
    {
      path: 'apps',
      element: <Navigate to="/apps" />,
    },
  ],
};

export default AppsDialogConfig;