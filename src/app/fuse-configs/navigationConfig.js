const navigationConfig = [
  {
    id: '1',
    title: 'E-Commerce',
    translate: 'ECOMMERCE',
    type: 'collapse',
    icon: 'shopping_cart',
    url: 'apps/e-commerce',
    children: [
      {
        id: 'e-commerce-products',
        title: 'Products',
        type: 'item',
        url: 'apps/e-commerce/products',
        end: true,
      },
      {
        id: 'e-commerce-product-detail',
        title: 'Product Detail',
        type: 'item',
        url: 'apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
      },
      {
        id: 'e-commerce-new-product',
        title: 'New Product',
        type: 'item',
        url: 'apps/e-commerce/products/new',
      },
      {
        id: 'e-commerce-orders',
        title: 'Orders',
        type: 'item',
        url: 'apps/e-commerce/orders',
        end: true,
      },
      {
        id: 'e-commerce-order-detail',
        title: 'Order Detail',
        type: 'item',
        url: 'apps/e-commerce/orders/1',
      },
    ],
  },
  {
    id: 'zonificacion',
    title: 'ZONIFICACIÓN',
    type: 'collapse',
    icon: 'view_quilt',
    children: []
  },
  {
    id: 'frecuencias',
    title: 'FRECUENCIAS',
    type: 'collapse',
    icon: 'date_range',
    children: []
  },
  {
    id: 'vrp',
    title: 'VRP',
    type: 'collapse',
    icon: 'alt_route',
    children: []
  },
  {
    id: 'digitalizador',
    title: 'DIGITALIZADOR',
    type: 'collapse',
    icon: 'edit',
    children: []
  },
  {
    id: 'administracion',
    title: 'ADMINISTRACIÓN',
    type: 'collapse',
    icon: 'construction',
    children: [
      {
        id: 'usuarios',
        title: 'Usuarios',
        type: 'item',
        icon: 'supervisor_account',
        url: 'apps/contacts/all',
      },
      {
        id: 'proyectos',
        title: 'Proyectos',
        type: 'item',
        icon: 'folder',
        url: 'apps/todo',
      },
      {
        id: 'cartografia',
        title: 'Cartografía',
        type: 'item',
        icon: 'map_rounded',
        url: 'administracion/carto',
      },
    ],
  },
];

export default navigationConfig;
