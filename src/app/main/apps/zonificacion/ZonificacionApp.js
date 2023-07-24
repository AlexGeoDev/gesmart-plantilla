import React, { useState } from 'react';
import MainContent from './MainContent';
import { Stack } from '@mui/material';

const ZonificacionApp = () => {

  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <Stack>
      <MainContent
        panelOpen={panelOpen}
        setPanelOpen={setPanelOpen}
      /> 
    </Stack>
  )
};

export default ZonificacionApp;