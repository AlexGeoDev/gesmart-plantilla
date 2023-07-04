import FusePageCarded from '@fuse/core/FusePageCarded';
// import FusePageCarded from '@fuse/core/FusePageCarded';

import { styled } from '@mui/material';
import React from 'react'

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    backgroundColor: '#57998f',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
}));

const MainContent = () => {

  return (
    <>
      <Root />
    </>
  )
}

export default MainContent;