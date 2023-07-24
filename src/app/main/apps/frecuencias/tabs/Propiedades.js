import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { 
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';

function Propiedades(props) {
  const { control, formState: { errors } } = props;
  const [disabled, setDisabled] = useState(true);

  const handleClick = () => {
    setDisabled(!disabled);
  };

  return (
    <>
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors?.name}
              required
              helperText={errors?.name?.message}
              label="Nombre del análisis de frecuencias"
              autoFocus
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="description"
              label="Descripción"
              type="text"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Stack direction='row' className='flex flex-1 items-center mt-8 mb-16'>
          <Typography variant="body1" color="initial" sx={{ width: '150px' }}>
            Cartografía de cálculo
          </Typography>
          <Controller
            name="selectOption1"
            control={control}
            render={({ field }) => (
              <FormControl variant="outlined" className='flex flex-1'>
                <InputLabel id="selectOption1-label">Opción</InputLabel>
                <Select
                  {...field}
                  labelId="selectOption1-label"
                  id="selectOption1"
                  label="Elegir zonificación"
                >
                  <MenuItem value="opcion1">Zonificacion 1</MenuItem>
                  <MenuItem value="opcion2">Zonificacion 2</MenuItem>
                  <MenuItem value="opcion3">Zonificacion 3</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Stack>

        <Stack spacing={3} direction='row' alignItems='center'>
          <Typography variant="body1" color="initial">
            Estado:
          </Typography>
          <TextField id="outlined-basic" label='Sin estado' variant="outlined" sx={{ width: '200px' }} />
          <Button
            variant="contained"
            color="secondary"
            disabled={disabled}
            style={{
              backgroundColor: disabled ? "#d7d7d6" : "secondary",
              borderRadius: "4px"
            }}
            onClick={handleClick}
          >
            PROCESAR
          </Button>
        </Stack>
      </div>
    </>
  );
}

export default Propiedades;
