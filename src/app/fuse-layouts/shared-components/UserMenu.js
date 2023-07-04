import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';
import ZonificacionApp from 'app/main/apps/zonificacion/ZonificacionApp';

const UserMenu = () => {
  const [userMenu, setUserMenu] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const handleOpenModal = () => {
    if (location.pathname === '/apps/zonificacion') {
      setUserMenu(null);
      ZonificacionApp.openModal();
    } else {
      navigate('/apps/zonificacion');
    }
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        
        <div className="hidden md:flex flex-col mx-4 items-end">
          {user.data && user.data.displayName ? (
            <Typography component="span" className="font-semibold flex">
            {user.data.displayName}
          </Typography>
          ) : (
            <Typography className="text-11 font-medium capitalize" color="textSecondary">
              Guest
            </Typography>
          )}
          {user.role && user.role.length > 0 ? (
            <Typography className="text-11 font-medium capitalize" color="textSecondary">
              {user.role.toString()}
            </Typography>
          ) : null}
        </div>

        {user.data && user.data.photoURL ? (
          <Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="md:mx-4">
            {user && user.data && user.data.displayName && user.data.displayName[0]}
          </Avatar>
        )}
      </Button>


      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/login" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleOpenModal} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>work_outline</Icon>
              </ListItemIcon>
              <ListItemText primary="Proyectos" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>mail</Icon>
              </ListItemIcon>
              <ListItemText primary="Correo" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/login"
              onClick={() => {
                dispatch(logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
};

export default UserMenu;