import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Typography } from '@mui/material';

export default function SelectProject() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = React.useState('');
  const [nameProject, setNameProject] = React.useState('');
  const [showSlug, setShowSlug] = React.useState('');

  const currentUrl = location.pathname;

  const handleMenuItemClick = (value, slug) => {
    navigate(`/apps/zonificacion/${slug}`);
    setShowSlug(slug);
    setSelectedProject(value);
    setNameProject(value);
    console.log('el valor de value es :' + value);
    console.log('el valor de slug es :' + slug);
  };

  React.useEffect(() => {
    const route = location.pathname.split('/').pop();
    setSelectedProject(route);
  }, [location]);

  const shouldDisplayUrl = currentUrl.includes('/apps/zonificacion/');

  const getSlugFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const slug = getSlugFromUrl(currentUrl).toUpperCase().replace(/-/g, ' ');

  return (
    <Box className="flex items-center">
      {shouldDisplayUrl && (
        <div>
          <Typography variant="h6">{slug}</Typography>
        </div>
      )}
      <FormControl variant="standard" sx={{ m: 1, border: 'none' }}>
        <Select value={selectedProject} displayEmpty className="border-1 border-red" sx={{ border: 'none' }}>
          <MenuItem
            component={Link}
            to="/apps/zonificacion/proyecto-madrid"
            onClick={() => handleMenuItemClick('Proyecto Madrid', 'proyecto-madrid')}
            value={'Proyecto Madrid'}
          >
            Proyecto Madrid
          </MenuItem>
          <MenuItem
            component={Link}
            to="/apps/zonificacion/proyecto-villavicencio"
            onClick={() => handleMenuItemClick('Proyecto Villavicencio', 'proyecto-villavicencio')}
            value={'Proyecto Villavicencio'}
          >
            Proyecto Villavicencio
          </MenuItem>
          <MenuItem
            component={Link}
            to="/apps/zonificacion/proyecto-barcelona"
            onClick={() => handleMenuItemClick('Proyecto Barcelona', 'proyecto-barcelona')}
            value={'Proyecto Barcelona'}
          >
            Proyecto Barcelona
          </MenuItem>
          {/* Agrega más opciones de enlace aquí */}
        </Select>
      </FormControl>
    </Box>
  );
}
