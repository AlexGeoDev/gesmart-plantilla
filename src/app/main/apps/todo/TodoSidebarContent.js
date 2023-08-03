import React, { useState } from 'react';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ReorderIcon from '@mui/icons-material/Reorder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Paper, Stack, Typography } from '@mui/material';
import { selectFilters } from './store/filtersSlice';
import { getProjects, getProjectsActive, openNewTodoDialog } from './store/todosSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: 'inherit!important',
  textDecoration: 'none!important',
  height: 40,
  width: '100%',
  borderRadius: 6,
  paddingLeft: 12,
  paddingRight: 12,
  marginBottom: 4,
  '&.active': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .05)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',
    '& .list-item-icon': {
      color: 'inherit',
    },
  },
  '& .list-item-icon': {
    fontSize: 28,
    width: 28,
    height: 28,
    marginRight: 16,
  },
}));

function TodoSidebarContent() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const { t } = useTranslation('projectsApp')

  const [activeButton, setActiveButton] = useState('activos'); // Estado para el botón activo
  const [activeProjects, setActiveProjects] = useState(true); // Estado para filtrar proyectos


  useEffect(() => {
    dispatch(getProjects()); // Llamada a la acción getProjects para obtener los proyectos
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProjectsActive());
  }, [dispatch]);

  const handleButtonClick = (isActive) => {
    setActiveButton(isActive ? 'activos' : 'baja');
    setActiveProjects(isActive);
  };

  return (
    <div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
      <Paper
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
      >
        <div className="p-24 pb-16">
          <Button
            onClick={() => {
              dispatch(openNewTodoDialog());
            }}
            variant="contained"
            color="secondary"
            className="w-full"
            sx={{ color: '#ffffff' }}
          >
            {t('NUEVO_PROYECTO')}
          </Button>
        </div>

        <Stack direction={'row'}>
          <Button
            sx={{
              marginX: 1.5,
              borderRadius: 2,
              // backgroundColor: '#eaeaeb',
              backgroundColor: activeButton === 'activos' ? '#eaeaeb' : '',
            }}
            className="flex flex-1 justify-start"
            onClick={() => {
              dispatch(getProjects()); // Llamada a la acción getProjects para obtener los proyectos
              console.log('1');
            }}
          >
            <ReorderIcon sx={{ fontSize: '26px' }} />
            <Typography variant="body1" color="initial" marginLeft={2}>
              {t('Proyectos')}
            </Typography>
          </Button>
        </Stack>

        <div className="px-12">
          <List>
            <ListSubheader className="pl-12" disableSticky>
              {t('ESTADO')}
            </ListSubheader>

            <Stack direction={'row'}>
              <Button
                sx={{
                  paddingX: 1.2,
                  borderRadius: 2,
                  // backgroundColor: '#eaeaeb',
                  // backgroundColor: activeButton === 'activos' ? '#eaeaeb' : '',
                }}
                className="flex flex-1 justify-start"
                disabled={true}
                onClick={() => {
                  dispatch(getProjectsActive());
                  console.log('2');
                }}
              >
                <FolderOpenIcon sx={{ fontSize: '26px' }} />
                <Typography variant="body1" color="initial" marginLeft={2}>
                  {t('Activos')}
                </Typography>
              </Button>
            </Stack>

            <Stack direction={'row'} mt={1}>
              <Button
                sx={{
                  paddingX: 1.2,
                  borderRadius: 2,
                  
                  // backgroundColor: '#eaeaeb',
                }}
                className="flex flex-1 justify-start"
                disabled={true}
                // onClick={() => {
                //   dispatch(getProjects()); // Llamada a la acción getProjects para obtener los proyectos
                //   console.log('1');
                // }}
              >
                <SnippetFolderOutlinedIcon sx={{ fontSize: '26px' }} />
                <Typography variant="body1" color="initial" marginLeft={2}>
                  {t('Baja')}
                </Typography>
              </Button>
            </Stack>

            {/* {filters.length > 0 &&
              filters.map((filter) => (
                <StyledListItem
                  button
                  component={NavLinkAdapter}
                  to={`/apps/todo/filter/${filter.handle}`}
                  activeClassName="active"
                  key={filter.id}
                >
                  <Icon className="list-item-icon" color="action" fontSize="50px">
                    {filter.icon}
                  </Icon>
                  <ListItemText primary={filter.title} disableTypography />
                </StyledListItem>
              ))} */}
          </List>
        </div>
      </Paper>
    </div>
  );
}

export default TodoSidebarContent;
