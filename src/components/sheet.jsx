import React, { useState,useEffect} from 'react';
import Sheet from "react-modal-sheet";
import styled from 'styled-components';
import {InfoPageSheet} from "../pages/Info"
const CustomSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    
  }
  .react-modal-sheet-container {
    background-color: #242424 !important;
  }
  .react-modal-sheet-header {
    background-color: #242424 !important;
  }
  .react-modal-sheet-drag-indicator {
    /*background-color: #ffff !important;*/
  }
  .react-modal-sheet-content {
    /*background-color: #242424 !important;*/
  }
`;

export const ClientSheet = ({sheetOption}) =>{
  const [isOpen,setIsOpen] = useState(false);

  const handleAction = event =>{
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen({
      isOpen: sheetOption.isOpen
    })
  },[sheetOption])

  if(!sheetOption.isOpen){return null;}

  return(
    <CustomSheet isOpen={isOpen} onClose={handleAction}>
      <Sheet.Container>
        <Sheet.Content>{<InfoPageSheet client={sheetOption.currentClient} closeSheet={handleAction}></InfoPageSheet>}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </CustomSheet>
  )
}