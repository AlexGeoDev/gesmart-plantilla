import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';
import fr from './i18n/fr';

const TodoApp = lazy(() => import('./TodoApp'));

i18next.addResourceBundle('en', 'projectsApp', en);
i18next.addResourceBundle('es', 'projectsApp', es);
i18next.addResourceBundle('fr', 'projectsApp', fr);

const TodoAppConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'apps/todo/label/:labelHandle',
      element: <TodoApp />,
      children: [{ path: ':todoId', element: <TodoApp /> }],
    },
    {
      path: 'apps/todo/filter/:filterHandle',
      element: <TodoApp />,
      children: [{ path: ':todoId', element: <TodoApp /> }],
    },
    {
      path: '/apps/todo/:folderHandle',
      element: <TodoApp />,
      children: [{ path: ':todoId', element: <TodoApp /> }],
    },
    {
      path: 'apps/todo',
      element: <Navigate to="/apps/todo/all" />,
    },
  ],
};

export default TodoAppConfig;
