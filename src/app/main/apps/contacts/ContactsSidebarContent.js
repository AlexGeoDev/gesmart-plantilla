import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { openNewContactDialog } from './store/contactsSlice';


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
    fontSize: 16,
    width: 16,
    height: 16,
    marginRight: 16,
  },
}));

function ContactsSidebarContent(props) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(({ contactsApp }) => contactsApp.user);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const dispatch = useDispatch();

  return (
    <div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
      <Paper
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
      >

        <div className="p-24">
          <Button
            variant="contained"
            color="secondary"
            className="w-full"
            onClick={(ev) => dispatch(openNewContactDialog())}
          >
            NUEVO USUARIO
          </Button>
        </div>

        <List className="pt-0 px-12">
          <StyledListItem
            button
            component={NavLinkAdapter}
            to="/apps/contacts/all"
            activeClassName="active"
          >
            <Icon className="list-item-icon text-16" color="action">
              menu
            </Icon>
            <ListItemText className="truncate flex justify-center" primary="Todos" disableTypography />
          </StyledListItem>
          <Typography variant="body1" color="initial" sx={{mt: 2}}>
            ESTADO
          </Typography>
          
          <StyledListItem
            button
            component={NavLinkAdapter}
            to="/apps/contacts/frequent"
            activeClassName="active"
          >
            <Icon className="list-item-icon text-16" color="action">
              how_to_reg
            </Icon>
            <ListItemText className="truncate" primary="Activos" disableTypography />
          </StyledListItem>
        
          <StyledListItem
            button
            component={NavLinkAdapter}
            to="/apps/contacts/starred"
            activeClassName="active"
          >
            <Icon className="list-item-icon text-16" color="action">
              person_add_disabled
            </Icon>
            <ListItemText className="truncate" primary="Baja" disableTypography />
          </StyledListItem>

          <Typography variant="body1" color="initial" sx={{mt: 2}}>
            PERFIL
          </Typography>
          <StyledListItem
            button
            component={NavLinkAdapter}
            to="/apps/contacts/frequent"
            activeClassName="active"
          >
            <ListItemText className="truncate" primary="Administrador" disableTypography />
          </StyledListItem>
          <StyledListItem
            button
            component={NavLinkAdapter}
            to="/apps/contacts/starred"
            activeClassName="active"
          >
            <ListItemText className="truncate" primary="Usuario" disableTypography />
          </StyledListItem>
        </List>
      </Paper>
    </div>
  );
}

export default ContactsSidebarContent;
