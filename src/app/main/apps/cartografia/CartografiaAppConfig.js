import { Navigate } from 'react-router-dom';
import CartografiaApp from './CartografiaApp';

const CartografiaAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/cartografia',
      element: <CartografiaApp />,
    },
    {
      path: 'apps/cartografia',
      element: <Navigate to="/apps/cartografia" />,
    },
  ],
};

export default CartografiaAppConfig;