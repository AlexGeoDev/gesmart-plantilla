import React from 'react'
import { styled } from '@mui/material/styles';

const panelWidth = 300;

const StyledPanel = styled('div')(({ theme, open, position }) => ({
  minWidth: panelWidth,
  width: panelWidth,
  maxWidth: panelWidth,
  height: '100vh',
}));


const ZonificacionSidebar = () => {
return (
  <>
    <StyledPanel />
  </>
  )
}

export default ZonificacionSidebar;