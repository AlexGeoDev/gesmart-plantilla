import React, { useState } from "react";
import { IconButton, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useLocation } from "react-router-dom";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  minWidth: '44px',
  borderRadius: '8px',
  backgroundColor: '#d7d6d7',
  marginInline: '5px',
  '& .MuiSvgIcon-root': {
    fontSize: 26,
    color: 'black',
  },
}));

function ToolsButtons() {
  const theme = useTheme();
  const [isViewQuiltActive, setViewQuiltActive] = useState(true);
  const [isDateRangeActive, setDateRangeActive] = useState(true);
  const location = useLocation();

  const handleViewQuiltClick = () => {
    setViewQuiltActive(true);
    setDateRangeActive(false);
  };

  const handleDateRangeClick = () => {
    setViewQuiltActive(false);
    setDateRangeActive(true);
  };

  // Verificar si la ruta actual coincide con las rutas excluidas
  const isExcludedRoute =
    location.pathname === "/apps/contacts/all" ||
    location.pathname === "/apps/todo/all" ||
    location.pathname === "/apps/cartografia";

  // Si la ruta está excluida, no renderizar el componente
  if (isExcludedRoute) {
    return null;
  }

  return (
    <div>
      <StyledIconButton
        color={isViewQuiltActive ? "primary" : "default"}
        onClick={handleViewQuiltClick}
        theme={theme}
      >
        <ViewQuiltIcon />
      </StyledIconButton>

      <StyledIconButton
        color={isDateRangeActive ? "primary" : "default"}
        onClick={handleDateRangeClick}
        theme={theme}
      >
        <DateRangeIcon />
      </StyledIconButton>
    </div>
  );
}

export default ToolsButtons;
