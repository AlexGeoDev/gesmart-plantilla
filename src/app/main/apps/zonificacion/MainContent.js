import React, { useState, useRef } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ZonificacionHeader from './ZonificacionHeader';
import Propiedades from './tabs/Propiedades';
import AreaCalculo from './tabs/AreaCalculo';
import Resultado from './tabs/Resultado';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, Stack } from '@mui/material';
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ZonificacionSidebar from './ZonificacionSidebar';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  bottom: '55px',
  minWidth: '44px',
  borderRadius: '8px',
  backgroundColor: '#d7d6d7',
  marginInline: '5px',
  '& .MuiSvgIcon-root': {
    fontSize: 26,
    color: 'black',
  },
  zIndex: 21,
}));

const Root = styled(FusePageCarded)(({ theme }) => ({
  bottom: 43,
  '& .FusePageCarded-header': {
    alignItems: 'center',
    backgroundColor: '#57998f',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
}));

const schema = yup.object().shape({
  name: yup
    .string()
    // .required('You must enter a product name')
    // .min(5, 'The product name must be at least 5 characters'),
});

const MainContent = ({panelOpen, setPanelOpen}) => {
  const [tabValue, setTabValue] = useState(0);
  const [showTabs, setShowTabs] = useState(false);
  const [isViewQuiltActive, setIsViewQuiltActive] = useState(false);
  const [isDateRangeActive, setIsDateRangeActive] = useState(false);
  // const [panelOpen, setPanelOpen] = useState(true);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
    console.log('panelOpen: ', panelOpen);
  };

  const pageLayout = useRef(null);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { watch, control, onChange, formState } = methods;
  const form = watch();

  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

  const handleNuevoClick = () => {
    setShowTabs(true); // Mostrar Propiedades al hacer clic en "NUEVO"
  };

  return (
    <Stack className='flex flex-1'>
      <Stack direction={'row'} spacing={2} sx={{marginLeft: '60px'}}>
          <StyledIconButton
            color={isViewQuiltActive ? "primary" : "default"}
            onClick={togglePanel}
          >
            <ViewQuiltIcon />
          </StyledIconButton>
          <StyledIconButton
            color={isDateRangeActive ? "primary" : "default"}
            disabled
          >
            <DateRangeIcon />
          </StyledIconButton>
      </Stack>

      <Stack className='flex flex-row' sx={{bottom: '43px'}} style={{bottom: '43px'}}>
        <Stack>
          {panelOpen && (
            <ZonificacionSidebar
              panelOpen={panelOpen}
              setPanelOpen={setPanelOpen}
            />
          )}
        </Stack>
        <Stack className='flex flex-1'>
          <Root
            header={
              <ZonificacionHeader pageLayout={pageLayout} onNuevoClick={handleNuevoClick} />
            }
            contentToolbar={showTabs && (
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                classes={{ root: 'w-full h-64' }}
              >
                <Tab key="propertiestab" className="h-64" label="Propiedades" />
                <Tab key="areatab" className="h-64" label="Área de cálculo" />
                <Tab key="resulttab" className="h-64" label="Resultado" />
              </Tabs>
            )}
            content={showTabs && (
              <div className="p-16 sm:p-24 max-w-2xl">
                {showTabs && tabValue === 0 && (
                  <Propiedades control={control} formState={formState} />
                )}
                {showTabs && tabValue === 1 && (
                  <AreaCalculo control={control} formState={formState} />
                )}
                {showTabs && tabValue === 2 && (
                  <Resultado control={control} formState={formState} />
                )}
              </div>
            )}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MainContent;
