import { authRoles } from "app/auth";
import i18next from 'i18next';

import en from './navigation-i18n/es';
import es from './navigation-i18n/en';
import fr from './navigation-i18n/fr';

i18next.addResourceBundle('en', 'navigation', es);
i18next.addResourceBundle('es', 'navigation', en);
i18next.addResourceBundle('fr', 'navigation', fr);

const navigationConfig = [
  {
    id: '1',
    title: 'Zonificacion',
    translate: 'ZONIFICACIÓN',
    type: 'item',
    icon: 'view_quilt',
    url: 'apps/zonificacion',
  },
  {
    id: '2',
    title: 'Frecuencias',
    translate: 'FRECUENCIAS',
    type: 'item',
    icon: 'date_range',
    url: 'apps/frecuencias',
  },
  {
    id: '3',
    title: 'Vrp',
    translate: 'VRP',
    type: 'item',
    icon: 'alt_route',
    url: 'apps/vrp',
  },
  {
    id: '4',
    title: 'Digitalizador',
    translate: 'DIGITALIZADOR',
    type: 'item',
    icon: 'edit',
    url: 'apps/digitalizador',
  },
  {
    id: '5',
    title: 'Administración',
    translate: 'ADMINISTRACIÓN',
    type: 'collapse',
    auth: authRoles.admin,
    icon: 'construction',
    children: [
      {
        id: '4.1',
        title: 'Usuarios',
        translate: 'USUARIOS',
        type: 'item',
        auth: authRoles.admin,
        icon: 'supervisor_account',
        url: 'apps/contacts/all',
      },
      {
        id: '4.2',
        title: 'Proyectos',
        translate: 'PROYECTOS',
        type: 'item',
        auth: authRoles.admin,
        icon: 'folder',
        url: 'apps/todo',
      },
      {
        id: '4.3',
        title: 'Cartografía',
        translate: 'CARTOGRAFÍA',
        type: 'item',
        auth: authRoles.admin,
        icon: 'map_rounded',
        url: 'apps/cartografia',
      },
    ],
  },
];

export default navigationConfig;
