import React from 'react';
import { useSelector } from 'react-redux';

const PanelZonificacion = () => {
  const isPanelOpen = useSelector(state => state.panel.isZonificacionPanelOpen);

  return (
    <div className={`panel ${isPanelOpen ? 'open' : ''}`}>
      {/* Aquí va el contenido de la tabla */}
      <table>
        <thead>
          <tr>
            <th>Columna 1</th>
            <th>Columna 2</th>
            {/* ... */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dato 1</td>
            <td>Dato 2</td>
            {/* ... */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PanelZonificacion;
