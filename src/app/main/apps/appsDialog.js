import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AppsDialog = () => {
  const [open, setOpen] = useState(true);
  const [selectProject, setSelectProject] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const options = [
    { value: 'proyecto-madrid', label: 'Proyecto Madrid' },
    { value: 'proyecto-villavicencio', label: 'Proyecto Villavicencio' },
    { value: 'proyecto-barcelona', label: 'Proyecto Barcelona' },
  ];

  const handleOpen = () => setOpen(true);

  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find((option) => option.value === selectedValue);
    setSelectProject(selectedOption ? selectedOption.value : '');
    setIsButtonEnabled(true);
  };

  const handleSubmit = () => {
    console.log('Proyecto seleccionado:', selectProject);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackdropClick = (event) => {
    event.stopPropagation();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ onClick: handleBackdropClick }}
      >
        <Box sx={style} onKeyDown={handleKeyDown}>
          <FormControl fullWidth>
            <InputLabel id="select-project">Seleccione un proyecto</InputLabel>
            <Select
              labelId="select-project"
              id="select-project"
              value={selectProject}
              onChange={handleSelect}
              required
              label="Seleccione un proyecto"
              renderValue={(selected) => {
                const selectedOption = options.find((option) => option.value === selected);
                return selectedOption ? selectedOption.label : '';
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="p-20 flex flex-1 justify-around">
            <Button
              component={Link}
              to={`/apps/zonificacion/${selectProject}`}
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={!isButtonEnabled}
            >
              ACEPTAR
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AppsDialog;
