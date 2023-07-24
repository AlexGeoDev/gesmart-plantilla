import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import OGCMapTile from 'ol/source/OGCMapTile.js';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Map as MapIcon, Layers as LayersIcon } from '@mui/icons-material';

const baseMaps = [
  { value: 'osm', label: 'OSM', icon: 'OSM' },
  { value: 'toner', label: 'Toner', icon: 'Toner' },
  { value: 'wms', label: 'World Imagery', icon: 'WMS' },
];

const styles = {
  speedDial: {
    position: 'absolute',
    bottom: 40,
  },
  speedDialAction: {
    width: 120,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const AreaCalculo = () => {
  const mapRef = useRef(null);
  const [baseMap, setBaseMap] = useState('osm');
  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  const handleOpenSpeedDial = () => {
    setOpenSpeedDial(true);
  };

  const handleCloseSpeedDial = () => {
    setOpenSpeedDial(false);
  };

  const handleChange = (event) => {
    setBaseMap(event.target.value);
  };

  useEffect(() => {
    const nyc = [-8249387.5, 4968481.5];

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: nyc,
        zoom: 6,
      }),
    });

    mapRef.current.map = map;

    return () => {
      map.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (baseMap === 'toner' && mapRef.current.map) {
      mapRef.current.map.getLayers().setAt(0, new TileLayer({
        source: new Stamen({
          layer: 'toner',
        }),
      }));
    } else if (baseMap === 'wms' && mapRef.current.map) {
      mapRef.current.map.getLayers().setAt(0, new TileLayer({
        source: new OGCMapTile({
          url: 'https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WebMercatorQuad',
        }),
      }));
    } else if (mapRef.current.map) {
      mapRef.current.map.getLayers().setAt(0, new TileLayer({
        source: new OSM(),
      }));
    }
  }, [baseMap]);

  return (
    <div>
      <SpeedDial
        ariaLabel="Cambiar mapa base"
        icon={<SpeedDialIcon icon={<LayersIcon />} />}
        onClose={handleCloseSpeedDial}
        onOpen={handleOpenSpeedDial}
        open={openSpeedDial}
        sx={styles.speedDial}
        edge="end"
        elevation={5}
      >
        {baseMaps.map((map) => (
          <SpeedDialAction
            key={map.value}
            icon={<span style={{ fontWeight: baseMap === map.value ? 'bold' : 'normal' }}>{map.icon}</span>}
            tooltipTitle={map.label}
            onClick={() => setBaseMap(map.value)}
            SpeedDialIconProps={{ color: baseMap === map.value ? 'secondary' : 'inherit' }}
            sx={{
              ...styles.speedDialAction,
              backgroundColor: baseMap === map.value ? 'rgba(137, 216, 230, 0.9)' : 'white',
            }}
          />
        ))}
      </SpeedDial>
      <div ref={mapRef} style={{ height: '60vh' }}>
        {/* Aquí el mapa */}
      </div>
    </div>
  );
};

export default AreaCalculo;
