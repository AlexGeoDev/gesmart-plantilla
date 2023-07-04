import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'app/auth';

const TodoApp = lazy(() => import('./TodoApp'));

const TodoAppConfig = {
  settings: {
    layout: {},
  },
  // auth: authRoles.user,
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
