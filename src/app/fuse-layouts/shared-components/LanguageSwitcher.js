import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from 'app/store/i18nSlice';

const languages = [
  { id: 'es', title: 'Español', flag: 'es' },
  { id: 'en', title: 'English', flag: 'en' },
  { id : 'fr', title: 'Français', flag: 'fr'},
];

function LanguageSwitcher(props) {
  const dispatch = useDispatch();

  const currentLanguageId = useSelector(({ i18n }) => i18n.language);
  const currentLanguage = languages.find((lng) => lng.id === currentLanguageId);

  const [menu, setMenu] = useState(null);

  const langMenuClick = (event) => {
    setMenu(event.currentTarget);
  };

  const langMenuClose = () => {
    setMenu(null);
  };

  function handleLanguageChange(lng) {
    dispatch(changeLanguage(lng.id));
    langMenuClose();
  }

  return (
    <>
      <Button className="h-40 w-64" onClick={langMenuClick}>
        <img
          className="mx-4 min-w-20"
          src={`assets/images/flags/${currentLanguage.flag}.png`}
          alt={currentLanguage.title}
        />

        <Typography className="mx-4 font-semibold uppercase" color="textSecondary">
          {currentLanguage.id}
        </Typography>
      </Button>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={langMenuClose}
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
        {languages.map((lng) => (
          <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
            <ListItemIcon className="min-w-40">
              <img
                className="min-w-20"
                src={`assets/images/flags/${lng.flag}.png`}
                alt={lng.title}
              />
            </ListItemIcon>
            <ListItemText primary={lng.title} />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
