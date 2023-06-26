import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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

const ZonificacionApp = () => {
  const [open, setOpen] = useState(false);
  const [selectProject, setSelectProject] = useState('');
  const [canCloseModal, setCanCloseModal] = useState(false);
  const [showSelectedProject, setShowSelectedProject] = useState(false);
  const modalRef = useRef();

  const options = [
    { value: 'Proyecto Madrid', label: 'Proyecto Madrid' },
    { value: 'Proyecto Villavicencio', label: 'Proyecto Villavicencio' },
    { value: 'Proyecto Barcelona', label: 'Proyecto Barcelona' },
    { value: 'Proyecto Bogotá', label: 'Proyecto Bogotá' },
    { value: 'Proyecto Valle', label: 'Proyecto Valle' },
    { value: 'Proyecto X', label: 'Proyecto X' },
  ];

  const handleSelect = (e) => {
    setSelectProject(e.target.value);
    setCanCloseModal(true);
  };

  const handleSubmit = () => {
    console.log('Proyecto seleccionado:', selectProject);
    handleClose();
    setShowSelectedProject(true);
  };

  const handleClose = () => {
    if (canCloseModal) {
      setOpen(false);
    }
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (open) {
      modalRef.current?.focus();
    }
  }, [open]);

  ZonificacionApp.openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} ref={modalRef} tabIndex="-1">
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
            {selectProject && (
              <Button onClick={handleSubmit} variant="contained" color="secondary">
                ACEPTAR
              </Button>
            )}

            <Button onClick={handleClose} variant="contained" color="error">
              CANCELAR
            </Button>
          </div>
        </Box>
      </Modal>

      {showSelectedProject && (
        <Typography variant="body1" color="initial">
          {selectProject}
        </Typography>
      )}
    </>
  );
};

export default ZonificacionApp;
