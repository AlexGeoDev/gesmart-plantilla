import { useState } from 'react';
import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeContact,
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog,
} from './store/contactsSlice';
import { Autocomplete, Chip, MenuItem, Select } from '@mui/material';

const defaultValues = {
  id: '',
  name: '',
  // lastName: '',
  // avatar: 'assets/images/avatars/profile.jpg',
  // nickname: '',
  perfil: '',
  // jobTitle: '',
  email: '',
  proyectos: '',
  // address: '',
  // birthday: '',
  // notes: '',
};

const options = [
  { value: 'Administrador' },
  { value: 'Usuario' },
];

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
});

function ContactDialog(props) {
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (contactDialog.type === 'edit' && contactDialog.data) {
      reset({ ...contactDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (contactDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...contactDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [contactDialog.data, contactDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return contactDialog.type === 'edit'
      ? dispatch(closeEditContactDialog())
      : dispatch(closeNewContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (contactDialog.type === 'new') {
      dispatch(addContact(data));
    } else {
      dispatch(updateContact({ ...contactDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeContact(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0} sx={{backgroundColor: '#ffffff'}}>
        <Toolbar className="flex w-full">
          <Typography variant="h4" color="#000000" sx={{mt:1}}>
            {contactDialog.type === 'new' ? 'Nuevo usuario' : 'Edit Contact'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Nombre de usuario"
                  id="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  id="email"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex flex-col">
            <Typography variant="body1" color="initial" sx={{mb:1}}>
              Perfil
            </Typography>
            <Controller
              name="perfil"
              control={control}
              render={({ field: { onChange, value: formPerfilVal } }) => (
                <Select
                  id="perfil-select"
                  value={formPerfilVal}
                  defaultValue={'Administrador'}
                  onChange={(event) => onChange(event.target.value)}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
                )}
              />
          </div>

          <div>
            <Typography variant="body1" color="initial" sx={{my:1}}>
              Proyectos
            </Typography>
            <Controller 
              name='projects'
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  id='tags-filled'
                  options={projects.map((item) => item.value)}
                  defaultValue={[projects[0].value]}
                  filterSelectedOptions
                  renderTags={(value, getTagProps) => 
                    value.map((option, index) => (
                      <Chip
                        variant='outlined'
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Selecione los proyectos"
                    />
                  )}                
                />
              )}
            />
          </div>

          <div className="mb-16">
              <div className="flex items-center justify-start p-12">
                <Typography variant="body1" color="initial">
                  Estado
                </Typography>
                <div className="flex">
                  <Controller
                    name="completed"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <IconButton
                        tabIndex={-1}
                        disableRipple
                        onClick={(ev) => onChange(!value)}
                        size="large"
                      >
                        {value ? (
                          <Icon color="secondary">check_circle</Icon>
                        ) : (
                          <Icon color="action">radio_button_unchecked</Icon>
                        )}
                      </IconButton>
                    )}
                  />
                </div>
              </div>
            </div>
        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className="justify-around p-4 pb-16 mb-8">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Aceptar
              </Button>
            </div>
            <div className="px-16">
              <Button
                variant="contained"
                color="error"
                type="button"
                disabled={false}
                onClick={(ev) => dispatch(closeComposeDialog())}
              >
                Cancelar
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Guardar
              </Button>
            </div>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default ContactDialog;

const projects = [
  { value: 'Projecto Bogotá' },
  { value: 'Proyecto Villavicencio'},
  { value: 'Proyecto Madrid' },
  { value: 'Proyecto Valencia' },
  { value: 'Proyecto Medellin' },
  { value: 'Proyecto x' },
];
