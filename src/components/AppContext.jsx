import React from "react";

export const CLIENT_CARD_OPTION = Object.freeze({
    SHEET:"Sheet",
    ROUTE:"Route",
});

/*
export const AppContext = React.createContext({
    clientCard: CLIENT_CARD_OPTION.ROUTE,
    setClientCard: () => {},
    reloadState:true,
    setReloadState: () => {},
    hiddenMenu:false,
    setHiddenMenu: () => {},
});*/

export const AppContext = React.createContext("app_context");