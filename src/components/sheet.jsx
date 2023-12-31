import React, {useCallback} from 'react';
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

export const ClientSheet = ({sheetOption,setSheetOption}) =>{

  const handleAction = useCallback( e =>{
    setSheetOption({
      isOpen:false,
      currentClient:null,
    })
  },[setSheetOption])

  if(!sheetOption.isOpen){return null;}

  return(
    <CustomSheet isOpen={sheetOption.isOpen} onClose={handleAction}>
      <Sheet.Container>
        <Sheet.Content>{<InfoPageSheet client={sheetOption.currentClient} closeSheet={handleAction}></InfoPageSheet>}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </CustomSheet>
  )
}