import React from 'react';
import { Icon, Button } from '@mui/material';

const PanelFrecuencia = ({ onClick, disabled }) => (
  <Button onClick={onClick} disabled={disabled}>
    <Icon>date_range</Icon>
  </Button>
);

export default PanelFrecuencia;
