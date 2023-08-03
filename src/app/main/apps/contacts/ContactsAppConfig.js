import i18next from 'i18next';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import en from './i18n/en';
import es from './i18n/es';
import fr  from './i18n/fr';

const ContactsApp = lazy(() => import('./ContactsApp'));

i18next.addResourceBundle('en', 'contactsApp', en);
i18next.addResourceBundle('es', 'contactsApp', es);
i18next.addResourceBundle('fr', 'contactsApp', fr);

const ContactsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/contacts/:id',
      element: <ContactsApp />,
    },
    {
      path: 'apps/contacts',
      element: <Navigate to="/apps/contacts/all" />,
    },
  ],
};

export default ContactsAppConfig;
