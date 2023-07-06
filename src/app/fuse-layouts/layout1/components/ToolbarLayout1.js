// import React from 'react';
// import { ThemeProvider, styled } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Hidden from '@mui/material/Hidden';
// import Toolbar from '@mui/material/Toolbar';
// import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
// import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
// import clsx from 'clsx';
// import { memo } from 'react';
// import { useSelector } from 'react-redux';
// import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
// import FullScreenToggle from '../../shared-components/FullScreenToggle';
// import { Box, Button, Icon } from '@mui/material';
// import SelectProject from 'app/fuse-layouts/shared-components/SelectProject';

// const StyledButton = styled(Button)(({ theme }) => ({
//   minWidth: '44px',
//   borderRadius: '8px',
//   backgroundColor: '#d7d6d7',
//   marginInline: '5px',
//   '& .MuiSvgIcon-root': {
//     fontSize: 26,
//     color: 'black',
//   },
// }));

// function ToolbarLayout1(props) {
//   const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
//   const navbar = useSelector(({ fuse }) => fuse.navbar);
//   const toolbarTheme = useSelector(selectToolbarTheme);

//   return (
//     <ThemeProvider theme={toolbarTheme}>
//       <AppBar
//         id="fuse-toolbar"
//         className={clsx('flex relative z-20 shadow-md', props.className)}
//         sx={{ backgroundColor: '#ffffff', color: '#000000' }}
//         position="static"
//       >
//         <Toolbar className="p-0 min-h-48 md:min-h-64">
//           <div className="flex flex-1 px-16">
//             {config.navbar.display && config.navbar.position === 'left' && (
//               <>
//                 <Hidden lgDown>
//                   {(config.navbar.style === 'style-3' ||
//                     config.navbar.style === 'style-3-dense') && (
//                     <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
//                   )}

//                   {config.navbar.style === 'style-1' && !navbar.open && (
//                     <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
//                   )}
//                 </Hidden>

//                 <Hidden lgUp>
//                   <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
//                 </Hidden>
//               </>
//             )}

//             <StyledButton>
//               <Icon>
//               view_quilt
//               </Icon>
//             </StyledButton>
//             <StyledButton>
//               <Icon>
//               date_range
//               </Icon>
//             </StyledButton>
//           </div>

//           <div>
//             <SelectProject />
//           </div>

//           <div className="flex items-center px-8 h-full overflow-x-auto">
//             <FullScreenToggle />
//             <UserMenu />
//           </div>

//           {config.navbar.display && config.navbar.position === 'right' && (
//             <>
//               <Hidden lgDown>
//                 {!navbar.open && <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />}
//               </Hidden>

//               <Hidden lgUp>
//                 <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
//               </Hidden>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//     </ThemeProvider>
//   );
// }

// export default memo(ToolbarLayout1);










import React, { useState } from 'react';
import { ThemeProvider, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import { Box, Button, Icon } from '@mui/material';
import SelectProject from 'app/fuse-layouts/shared-components/SelectProject';
import { useNavigate, useLocation } from 'react-router-dom';

// Importamos los componentes de los iconos
import PanelFrecuencia from 'app/fuse-layouts/shared-components/panels/PanelFrecuencia';
import PanelZonificacion from 'app/fuse-layouts/shared-components/panels/PanelZonificacion';
import ToolsButtons from 'app/fuse-layouts/shared-components/ToolsButtons';

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: '44px',
  borderRadius: '8px',
  backgroundColor: '#d7d6d7',
  marginInline: '5px',
  '& .MuiSvgIcon-root': {
    fontSize: 26,
    color: 'black',
  },
}));

function ToolbarLayout1(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const navbar = useSelector(({ fuse }) => fuse.navbar);
  const toolbarTheme = useSelector(selectToolbarTheme);

  const navigate = useNavigate();
  const location = useLocation();
  const [isVerticalNavbar, setVerticalNavbar] = useState(false);

  const handleIconClick = () => {
    setVerticalNavbar(true);
    navigate('/apps/zonificacion');
  };

  const isZonificacionRoute =
    // location.pathname.startsWith('/apps/zonificacion') ||
    location.pathname.startsWith('/apps/zonificacion/');
  const isFrecuenciaRoute = location.pathname === '/apps/frecuencia';

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        sx={{ backgroundColor: '#ffffff', color: '#000000' }}
        position="static"
      >
        <Toolbar className="p-0 min-h-48 md:min-h-64">
          <div className="flex flex-1 px-16">
            {config.navbar.display && config.navbar.position === 'left' && (
              <>
                <Hidden lgDown>
                  {(config.navbar.style === 'style-3' ||
                    config.navbar.style === 'style-3-dense') && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                  )}

                  {config.navbar.style === 'style-1' && !navbar.open && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                  )}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
                </Hidden>
              </>
            )}
            <div>
              <ToolsButtons />
            </div>
          </div>


          <div>
            <SelectProject />
          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto">
            <FullScreenToggle />
            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === 'right' && (
            <>
              <Hidden lgDown>
                {!navbar.open && <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Renderizamos el navbar vertical cuando se hace clic en alguno de los iconos */}
      {isVerticalNavbar && (
        <div className="fixed inset-0 bg-white z-50 shadow-md">
          <div className="flex justify-center items-center h-screen">
            {/* Contenido del navbar vertical */}
            {isZonificacionRoute && <PanelZonificacion />}
            {isFrecuenciaRoute && <PanelFrecuencia />}
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
