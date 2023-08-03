// import React from 'react';
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
// import { styled, useTheme } from "@mui/material/styles";
// import { Icon, Stack } from '@mui/material';
// import { useTranslation } from 'react-i18next';

// const StyledIcon = styled(Icon)(({ theme }) => ({
//   minWidth: '44px',
//   minHeight: '36px',
//   borderRadius: '8px',
//   marginInline: '5px',
//   '& .MuiSvgIcon-root': {
//     fontSize: 26,
//     color: 'white',
//   },
// }));

// const ColorButton = styled(Button)({
//   backgroundColor: '#939293',
//   color: '#fff',
//   border: '1px solid black',
//   borderRadius: 4,
//   '&:hover': {
//     backgroundColor: '#84b42d',
//   },
// });

// const ZonificacionHeader = ({ onNuevoClick }) => {
//   const theme = useTheme();
//   const { t } = useTranslation('frecuenciasApp');


//   const handleNuevoButtonClick = () => {
//     if (onNuevoClick) {
//       onNuevoClick(); // Llamar a la función proporcionada por el componente padre al hacer clic en "NUEVO"
//     }
//   };

//   return (
//     <>
//       <Stack direction='column' className='flex flex-1'>
//         <Stack direction='row' alignItems={'center'}>
//           <StyledIcon theme={theme}>
//             <ViewQuiltIcon />
//           </StyledIcon>
//           <Typography variant="h5" color="white">
//             {t('ZONIFICACIONES')}
//             {console.log('t: ' + t)}
//           </Typography>
//         </Stack>
//         <Stack
//           className='flex flex-1 mt-20'
//           direction='row'
//           justifyContent="space-between"
//         >
//           <Stack direction='row' spacing={2}>
//             <ColorButton variant='contained' onClick={handleNuevoButtonClick}>
//               {t('NUEVO')}
//             </ColorButton>
//             <ColorButton variant='contained'>
//               {t('BORRAR')}
//             </ColorButton>
//           </Stack>
//           <Stack direction='row' spacing={2}>
//             <ColorButton variant='contained'>
//               {t('EDITAR')}
//             </ColorButton>
//             <ColorButton variant='contained'>
//               {t('GUARDAR')}
//             </ColorButton>
//             <ColorButton variant='contained'>
//               {t('CANCELAR')}
//             </ColorButton>
//           </Stack>
//         </Stack>
//       </Stack>
//     </>
//   )
// }

// export default ZonificacionHeader;








import React, { useState } from 'react';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { styled, useTheme } from "@mui/material/styles";
import { Icon, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

const StyledIcon = styled(Icon)(({ theme }) => ({
  minWidth: '44px',
  minHeight: '36px',
  borderRadius: '8px',
  marginInline: '5px',
  '& .MuiSvgIcon-root': {
    fontSize: 26,
    color: 'white',
  },
}));

const ColorButton = styled(Button)(({ theme, isEnabled, isCancelar }) => ({
  backgroundColor: isEnabled ? (isCancelar ? '#ff5c54' : '#93d36f') : '#939392',
  color: '#fff',
  border: '0.5px solid black',
  borderRadius: 4,
  '&:hover': {
    backgroundColor: isEnabled ? (isCancelar ? '#ff0000' : '#84b42d') : '#939392',
  },
}));

const ZonificacionHeader = ({ onNuevoClick }) => {
  const theme = useTheme();
  const { t } = useTranslation('zonificacionApp');

  // Estado local para controlar la habilitación de los botones
  const [botonesHabilitados, setBotonesHabilitados] = useState({
    nuevo: true,
    borrar: false,
    editar: false,
    guardar: false,
    cancelar: false,
  });

  const handleNuevoButtonClick = () => {
    // Deshabilitar el botón "NUEVO" y habilitar los demás botones
    setBotonesHabilitados({
      nuevo: false,
      borrar: true,
      editar: true,
      guardar: true,
      cancelar: true,
    });

    if (onNuevoClick) {
      onNuevoClick();
    }
  };

  return (
    <>
      <Stack direction='column' className='flex flex-1'>
        <Stack direction='row' alignItems={'center'}>
          <StyledIcon theme={theme}>
            <ViewQuiltIcon />
          </StyledIcon>
          <Typography variant="h5" color="white">
            {t('ZONIFICACIONES')}
          </Typography>
        </Stack>
        <Stack
          className='flex flex-1 mt-20'
          direction='row'
          justifyContent="space-between"
        >
          <Stack direction='row' spacing={2}>
            <ColorButton
              variant='contained'
              onClick={handleNuevoButtonClick}
              isEnabled={botonesHabilitados.nuevo}
            >
              {t('NUEVO')}
            </ColorButton>
            <ColorButton
              variant='contained'
              isEnabled={botonesHabilitados.borrar}
            >
              {t('BORRAR')}
            </ColorButton>
          </Stack>
          <Stack direction='row' spacing={2}>
            <ColorButton
              variant='contained'
              isEnabled={botonesHabilitados.editar}
            >
              {t('EDITAR')}
            </ColorButton>
            <ColorButton
              variant='contained'
              isEnabled={botonesHabilitados.guardar}
            >
              {t('GUARDAR')}
            </ColorButton>
            <ColorButton
              variant='contained'
              isEnabled={botonesHabilitados.cancelar}
              isCancelar
            >
              {t('CANCELAR')}
            </ColorButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default ZonificacionHeader;
