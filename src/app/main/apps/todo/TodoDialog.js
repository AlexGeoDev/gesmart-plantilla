import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, DateTimePicker } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { amber, red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { selectLabels } from './store/labelsSlice';
import {
  removeTodo,
  addTodo,
  closeNewTodoDialog,
  closeEditTodoDialog,
  updateTodo,
} from './store/todosSlice';
import { Select } from '@mui/material';
import { CookieRounded } from '@mui/icons-material';


const options = [
  { value: 'Recogida' },
  { value: 'Limpieza' },
  { value: 'Recogida y Limpieza' },
  { value: 'Zonas verdes y Jardinería' }
];

const defaultValues = {
  id: '',
  name: '',
  location: '',
  startDate: new Date(),
  scope: '',
  description: '',
  active: false,
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a title'),
});

function TodoDialog(props) {
  const dispatch = useDispatch();
  const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);
  const labels = useSelector(selectLabels);
  const [labelMenuEl, setLabelMenuEl] = useState(null);
  

  const { watch, handleSubmit, formState, reset, control, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [selectedLabel, setSelectedLabel] = useState(null);
  const handleMenuClick = (ev) => {
    setLabelMenuEl(ev.currentTarget);
  };

  const handleMenuItemClick = (label) => {
    setSelectedLabel(label);
    setLabelMenuEl(null);
  };

  const { errors, isValid, dirtyFields } = formState;
  const formId = watch('id');
  const formLabels = watch('labels');
  const dueDate = watch('deuDate');
  const startDate = watch('startDate');
  const formUsuarios = watch('usuarios');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (todoDialog.type === 'edit' && todoDialog.data) {
      reset({ ...todoDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (todoDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...todoDialog.data,
      });
    }
  }, [todoDialog.data, todoDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (todoDialog.props.open) {
      initDialog();
    }
  }, [todoDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeTodoDialog() {
    return todoDialog.type === 'edit'
      ? dispatch(closeEditTodoDialog())
      : dispatch(closeNewTodoDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (todoDialog.type === 'new') {
      dispatch(addTodo({ id: FuseUtils.generateGUID(), ...data }));
    } else {
      dispatch(updateTodo({ ...todoDialog.data, ...data }));
    }
    closeTodoDialog();
  }

  function onSubmit(data) {
    const newTodoData = {
      name: data.name,
      location: data.location,
      startDate: new Date(),
      scope: data.scope,
      description: data.description,
      active: data.active,
    };

    if (todoDialog.type === 'new') {
      dispatch(addTodo(newTodoData));
    } else {
      dispatch(updateTodo({ ...todoDialog.data, ...newTodoData }));
    }
    closeTodoDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    showDialog();
  }

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const showDialog = () => {
    setShowDeleteDialog(true);
  };

  const hideDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleDelete = () => {
    dispatch(removeTodo(formId)).then(() => {
      closeTodoDialog();
    });
    hideDialog();
  };

  return (
    <Dialog {...todoDialog.props} onClose={closeTodoDialog} fullWidth maxWidth="sm" scroll="body">
      <AppBar position="static" elevation={0} sx={{backgroundColor: '#ffffff'}}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="#000000">
            {todoDialog.type === 'new' ? 'Nuevo Proyecto' : 'Editar Proyecto'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: 'p-0' }}>
          <div className="px-16 sm:px-24">
            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre de proyecto"
                    autoFocus
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    required
                    variant="outlined"
                  />
                )}
              />
            </FormControl>

            <div className="flex -mx-4">
              <Controller
                name="startDate"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    value={value}
                    onChange={onChange}
                    maxDate={dueDate}
                    renderInput={(_props) => (
                      <TextField label="Start Date" className="mt-8 mb-16 mx-4" {..._props} />
                    )}
                  />
                )}
              />
            </div>

            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField 
                    {...field} 
                    label="Ámbito / Ubicación"  
                    variant="outlined" 
                  />
                )}
              />
            </FormControl>

            <div>
              <Typography variant="body1" color="initial">
                Tipología
              </Typography>
              <Controller
                name="scope"
                required
                control={control}
                render={({ field: { onChange, value: formLabelsVal } }) => (
                  <Select
                    id="label-select"
                    value={formLabelsVal || 'Recogida'}
                    defaultValue={'Recogida'}
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

            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField 
                    {...field} 
                    label="Notes" 
                    multiline 
                    rows="6" 
                    variant="outlined"
                  />
                )}
              />
            </FormControl>

            <Typography variant="body1" color="initial">
              Usuarios
            </Typography>
            <Controller 
              name='usuarios'
              control={control}
              render={({ field }) => (
                <Autocomplete 
                  multiple
                  id='tags-filled'
                  options={formUsuarios || []}
                  defaultValue={formUsuarios || []}
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
                      placeholder="Seleccione los usuarios"
                    />
                  )}                
                />
              )}
            />

            <div className="mb-16">
                <div className="flex items-center">
                <Typography variant="body1" color="initial">
                  Estado
                </Typography>
                  <Controller
                    name="active"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <IconButton
                        tabIndex={-1}
                        disableRipple
                        onClick={(ev) => onChange(!value)}
                        size="large"
                      >
                        {!value ? (
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

        {todoDialog.type === 'new' ? (
          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Agregar
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Guardar
              </Button>
            </div>
            <IconButton className="min-w-auto" onClick={handleRemove}>
              <Icon style={{ color: red[500] }}>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
      <Dialog
        open={showDeleteDialog}
        onClose={hideDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="initial">
            ¿Estás seguro de que deseas eliminar el proyecto?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Aceptar
          </Button>
          <Button onClick={hideDialog} color="primary">
            Cancelar
          </Button>
      </DialogActions>
      </Dialog>
    </Dialog>
  );
}

export default TodoDialog;
