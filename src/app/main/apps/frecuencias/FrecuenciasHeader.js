import React from 'react';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DateRangeIcon from "@mui/icons-material/DateRange";
import { styled, useTheme } from "@mui/material/styles";
import { Icon, Stack } from '@mui/material';

const StyledIcon = styled(Icon)(({ theme }) => ({
  minHeight: '36px',
  minWidth: '44px',
  borderRadius: '8px',
  marginInline: '5px',
  '& .MuiSvgIcon-root': {
    fontSize: 26,
    color: 'white',
  },
}));

const ColorButton = styled(Button)({
  backgroundColor: '#939293',
  color: '#fff',
  border: '1px solid black',
  borderRadius: 4,
  '&:hover': {
    backgroundColor: '#84b42d',
  },
});

const FrecuenciasHeader = ({ onNuevoClick }) => {
  const theme = useTheme();

  const handleNuevoButtonClick = () => {
    if (onNuevoClick) {
      onNuevoClick();
    }
  };

  return (
    <>
      <Stack direction='column' className='flex flex-1'>
        <Stack direction='row' alignItems={'center'}>
          <StyledIcon theme={theme}>
            <DateRangeIcon />
          </StyledIcon>
          <Typography variant="h5" color="white">
            Frecuencias
          </Typography>
        </Stack>
        <Stack
          className='flex flex-1 mt-20'
          direction='row'
          justifyContent="space-between"
        >
          <Stack direction='row' spacing={2}>
            <ColorButton variant='contained' onClick={handleNuevoButtonClick}>
              NUEVO
            </ColorButton>
            <ColorButton variant='contained'>
              BORRAR
            </ColorButton>
          </Stack>
          <Stack direction='row' spacing={2}>
            <ColorButton variant='contained'>
              EDITAR
            </ColorButton>
            <ColorButton variant='contained'>
              GUARDAR
            </ColorButton>
            <ColorButton variant='contained'>
              CANCELAR
            </ColorButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default FrecuenciasHeader;
