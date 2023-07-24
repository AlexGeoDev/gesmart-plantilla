import React, { useState } from 'react';
import FrecuenciasMainContent from './FrecuenciasMainContent';
import { Stack } from '@mui/material';

const FrecuenciasApp = () => {

  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <Stack>
      <FrecuenciasMainContent
        panelOpen={panelOpen}
        setPanelOpen={setPanelOpen}
      />
    </Stack>
  )
}

export default FrecuenciasApp;