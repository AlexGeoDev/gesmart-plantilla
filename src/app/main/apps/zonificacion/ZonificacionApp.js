import React from 'react'
import MainContent from './MainContent'
import ZonificacionSidebar from './ZonificacionSidebar'

const ZonificacionApp = () => {
  return (
    <div className='flex colum'>
      <ZonificacionSidebar />
      <MainContent />
    </div>
  )
}

export default ZonificacionApp