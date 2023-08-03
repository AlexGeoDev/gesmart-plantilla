// import React from 'react';
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import { styled, useTheme } from "@mui/material/styles";
// import { Icon, Stack } from '@mui/material';
// import { useTranslation } from 'react-i18next';

// const StyledIcon = styled(Icon)(({ theme }) => ({
//   minHeight: '36px',
//   minWidth: '44px',
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

// const FrecuenciasHeader = ({ onNuevoClick }) => {
//   const theme = useTheme();
//   const { t } = useTranslation('frecuenciasApp');

//   const handleNuevoButtonClick = () => {
//     if (onNuevoClick) {
//       onNuevoClick();
//     }
//   };

//   return (
//     <>
//       <Stack direction='column' className='flex flex-1'>
//         <Stack direction='row' alignItems={'center'}>
//           <StyledIcon theme={theme}>
//             <DateRangeIcon />
//           </StyledIcon>
//           <Typography variant="h5" color="white">
//             {t('FRECUENCIAS')}
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

// export default FrecuenciasHeader;







import React, { useState } from 'react';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DateRangeIcon from "@mui/icons-material/DateRange";
import { styled, useTheme } from "@mui/material/styles";
import { Icon, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

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

const ColorButton = styled(Button)(({ theme, isEnabled, isCancel }) => ({
  backgroundColor: isEnabled ? (isCancel ? '#ff5c54' : '#93d36f') : '#939392',
  color: '#fff',
  border: '1px solid black',
  borderRadius: 4,
  '&:hover': {
    backgroundColor: isEnabled ? (isCancel ? '#ff0000' : '#84b42d') : '#939392',
  },
}));

const FrecuenciasHeader = ({ onNuevoClick }) => {
  const theme = useTheme();
  const { t } = useTranslation('frecuenciasApp');

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
            <DateRangeIcon />
          </StyledIcon>
          <Typography variant="h5" color="white">
            {t('FRECUENCIAS')}
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
              isCancel
            >
              {t('CANCELAR')}
            </ColorButton>
          </Stack>          
        </Stack>
      </Stack>
    </>
  )
}

export default FrecuenciasHeader;
