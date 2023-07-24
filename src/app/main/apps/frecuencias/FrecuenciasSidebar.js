import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Divider, Stack } from '@mui/material';
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

let panelWidth = 400;

const StyledPanel = styled('div')(({ theme }) => ({
  minWidth: panelWidth,
  width: panelWidth,
  position: 'relative',
  bottom: 43,
}));

const FrecuenciasSidebar = ({panelOpen, setPanelOpen}) => {
  const handleTogglePanel = () => {
    setPanelOpen(false);
  };

  return (
    <>
      <StyledPanel className='flex flex-col'>
        <Stack direction={'row'} margin={1} alignItems={'center'}>
          <CloseIcon onClick={handleTogglePanel} sx={{position: 'relative', left: '0px'}}/>
          <Stack direction={'row'} className='flex flex-1 justify-center items-center' spacing={2}>
            <Typography variant="h6" color="initial">
              COLA DE FRECUENCIAS
            </Typography>
            <ViewQuiltIcon />
          </Stack>
        </Stack>
        <Divider />
        <Stack margin={1}>
          Lorem ipsum dolor sit amet, consectetur adip id, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu
        </Stack>
      </StyledPanel>
    </>
  );
};

export default FrecuenciasSidebar;