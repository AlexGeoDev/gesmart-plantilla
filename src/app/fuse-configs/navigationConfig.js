import { authRoles } from "app/auth";

const navigationConfig = [
  {
    id: 'zonificacion',
    title: 'ZONIFICACIÓN',
    type: 'item',
    icon: 'view_quilt',
    url: 'apps/zonificacion',
  },
  {
    id: 'frecuencias',
    title: 'FRECUENCIAS',
    type: 'item',
    icon: 'date_range',
    url: 'apps/frecuencias',
  },
  {
    id: 'vrp',
    title: 'VRP',
    type: 'item',
    icon: 'alt_route',
    url: 'apps/vrp',
  },
  {
    id: 'digitalizador',
    title: 'DIGITALIZADOR',
    type: 'item',
    icon: 'edit',
    url: 'apps/digitalizador',
  },
  {
    id: 'administracion',
    title: 'ADMINISTRACIÓN',
    type: 'collapse',
    auth: authRoles.admin,
    icon: 'construction',
    children: [
      {
        id: 'usuarios',
        title: 'Usuarios',
        type: 'item',
        auth: authRoles.admin,
        icon: 'supervisor_account',
        url: 'apps/contacts/all',
      },
      {
        id: 'proyectos',
        title: 'Proyectos',
        type: 'item',
        auth: authRoles.admin,
        icon: 'folder',
        url: 'apps/todo',
      },
      {
        id: 'cartografia',
        title: 'Cartografía',
        type: 'item',
        auth: authRoles.admin,
        icon: 'map_rounded',
        url: 'apps/cartografia',
      },
    ],
  },
];

export default navigationConfig;
