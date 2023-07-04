/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['Administrador'],
  // staff: ['admin', 'staff'],
  user: [
    'Administrador',
    'Usuario'
  ],
  onlyGuest: [],
};

export default authRoles;
