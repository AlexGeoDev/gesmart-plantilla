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
      </Container>
    </>
  )
}

export default VrpApp;