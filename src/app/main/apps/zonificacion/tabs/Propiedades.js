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
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';

const RoundButton = styled(Button)({
  background: '#fe7042',
  color: 'white',
  borderRadius: '50%',
  minWidth: '34px',
  height: '34px',
});

function Propiedades(props) {
  const [counterZones, setCounterZones] = useState(1);
  const [counterArea, setCounterArea] = useState(1);
  const { control, formState: { errors } } = props;
  const [selectedCalculationType, setSelectedCalculationType] = useState('zonas');
  const [disabled, setDisabled] = useState(true);

  const handleClick = () => {
    setDisabled(!disabled);
  };

  function handleAddZones() {
    setCounterZones(counterZones + 1);
  }

  function handleLessZones() {
    if (counterZones > 1) setCounterZones(counterZones - 1);
  }

  function handleAddArea() {
    setCounterArea(counterArea + 1);
  }

  function handleLessArea() {
    if (counterArea > 1) setCounterArea(counterArea - 1);
  }

  const handleCalculationTypeChange = (event) => {
    setSelectedCalculationType(event.target.value);
  }

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
              label="Nombre de zonificación"
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
                  label="Opción"
                >
                  <MenuItem value="opcion1">Opción 1</MenuItem>
                  <MenuItem value="opcion2">Opción 2</MenuItem>
                  <MenuItem value="opcion3">Opción 3</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction='row' className='flex flex-1 items-center mt-8 mb-16'>
          <Typography variant="body1" color="initial" sx={{ width: '150px' }}>
            tipologías de bordillo
          </Typography>
          <Controller
            name="selectOption2"
            control={control}
            render={({ field }) => (
              <FormControl variant="outlined" className='flex flex-1'>
                <InputLabel id="selectOption2-label">Opción</InputLabel>
                <Select
                  {...field}
                  labelId="selectOption2-label"
                  id="selectOption2"
                  label="Opción"
                >
                  <MenuItem value="opcion1">Bordillo 1</MenuItem>
                  <MenuItem value="opcion2">Bordillo 2</MenuItem>
                  <MenuItem value="opcion3">Bordillo 3</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction='column' className='flex mt-8 mb-16'>
          <Typography variant="body1" color="initial">
            Tipo de cálculo:
          </Typography>

          <FormControl className='p-10'>
            <RadioGroup
              className='w-200'
              value={selectedCalculationType}
              onChange={handleCalculationTypeChange}
            >
              <FormControlLabel value="zonas" control={<Radio />} label="Número de zonas"/>
              <FormControlLabel value="area" control={<Radio />} label="Área máxima"/>
            </RadioGroup>
          </FormControl>
          
          {selectedCalculationType === 'area' ? null : (
          <Stack direction='row' className='flex justify-start mt-8 mb-16 pl-10'>
            <Stack direction='row' spacing={3} className='flex items-center'>
              <Typography variant="body1" color="initial">
                Número de zonas:
              </Typography>
              <Stack direction='row' spacing={2} alignItems='center'>
                <RoundButton onClick={handleLessZones}>
                  -
                </RoundButton>
                <TextField id="outlined-basic" variant="outlined" value={counterZones} sx={{width: '50px'}}/>
                <RoundButton onClick={handleAddZones}>
                  +
                </RoundButton>
              </Stack>
            </Stack>
          </Stack>
          )}

          {selectedCalculationType === 'zonas' ? null : (
            <Stack direction='row' className='flex justify-start mt-8 mb-16 pl-10'>
              <Stack direction='row' spacing={3} className='flex items-center'>
                <Typography variant="body1" color="initial">
                  Área máxima (m2):
                </Typography>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <RoundButton onClick={handleLessArea}>
                    -
                  </RoundButton>
                  <TextField id="outlined-basic" variant="outlined" value={counterArea} sx={{ width: '50px' }} />
                  <RoundButton onClick={handleAddArea}>
                    +
                  </RoundButton>
                </Stack>
              </Stack>
            </Stack>
          )}
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
