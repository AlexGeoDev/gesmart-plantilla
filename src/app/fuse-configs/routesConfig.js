import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';

const routeConfigs = [
  ...appsConfigs,
  ...pagesConfigs,
  LogoutConfig,
  LoginConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, [
    'Administrador',
    'Usuario',
  ]),
  {
    path: '/',
    element: <Navigate to="apps/zonificacion" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="pages/errors/error-404" />,
  },
];

export default routes;
