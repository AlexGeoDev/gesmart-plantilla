import React from 'react';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const VrpApp = () => {
  return (
    <>
      <Container sx={{
        margin: 'auto',
      }}>
        <Typography variant="h3" color="initial" className='flex justify-center'>
          VRP en construcción
        </Typography>
        <div className='flex justify-center mt-20'>
          <img 
            width='70%'
            src="assets/images/backgrounds/construyendo.jpg" 
            alt="Imagen describe un sitio en cosntrucción" />
        </div>        
      </Container>
    </>
  )
}

export default VrpApp;