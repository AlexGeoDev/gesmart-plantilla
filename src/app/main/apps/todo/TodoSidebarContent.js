import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Paper, Stack, Typography } from '@mui/material';
import { selectFilters } from './store/filtersSlice';
import { getProjects, openNewTodoDialog } from './store/todosSlice';
import { useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.gesmart-urbaser.com';

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

  const updateProjects = async () => {
    try {
      const response = await axios.get('/project');
      const projects = response.data;
      dispatch(getProjects.fulfilled({ data: projects }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Puedes manejar el error aquí, mostrar un mensaje de error, etc.
    }
  };

  useEffect(() => {
    updateProjects();
  }, []);
  
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
            sx={{color: '#ffffff'}}
          >
            NUEVO PROYECTO
          </Button>
        </div>

        <Stack direction={'row'}>
          <Button 
            sx={{
              marginX: 1.5,
              borderRadius: 2,
              backgroundColor: '#eaeaeb',
            }}
            className='flex flex-1 justify-start'
            onClick={() => {
              updateProjects();
              console.log('1');
            }}
          >
            <ReorderIcon sx={{fontSize: '26px'}}/>
            <Typography variant="body1" color="initial" marginLeft={2}>Proyectos</Typography>
          </Button>
        </Stack>

        <div className="px-12">
          <List>
            <ListSubheader className="pl-12" disableSticky>
              ESTADO
            </ListSubheader>

            {filters.length > 0 &&
              filters.map((filter) => (
                <StyledListItem
                  button
                  component={NavLinkAdapter}
                  to={`/apps/todo/filter/${filter.handle}`}
                  activeClassName="active"
                  key={filter.id}
                >
                  <Icon className="list-item-icon" color="action" fontSize='50px'>
                    {filter.icon}
                  </Icon>
                  <ListItemText primary={filter.title} disableTypography />
                </StyledListItem>
              ))}
          </List>
        </div>
      </Paper>
    </div>
  );
}

export default TodoSidebarContent;
