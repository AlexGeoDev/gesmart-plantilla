// import { useSelector } from 'react-redux';
// import { useTheme, ThemeProvider } from '@mui/material/styles';
// import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
// import clsx from 'clsx';
// import Typography from '@mui/material/Typography'

// function FusePageSimpleHeader(props) {
//   const theme = useTheme();
//   const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

//   return (
//     <>
//       {/* {props.header && <ThemeProvider theme={contrastTheme}>{props.header}</ThemeProvider>} */}
//       <div className='flex flex-1 justify-center items-center border-1'>
//         <Typography variant="h6" color="initial" className='h-90'>COLA DE ZONIFICACIONES</Typography>
//       </div>
//     </>
//   );
// }

// export default FusePageSimpleHeader;







import { useSelector } from 'react-redux';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';

function FusePageSimpleHeader(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <div className={clsx('FusePageSimple-header')}>
      {props.header && <ThemeProvider theme={contrastTheme}>{props.header}</ThemeProvider>}
    </div>
  );
}

export default FusePageSimpleHeader;

