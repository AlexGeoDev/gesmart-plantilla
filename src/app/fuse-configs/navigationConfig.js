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
