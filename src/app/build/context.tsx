"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Content } from "@prismicio/client";

type CustomizerControlsContext = {};

const defaultContext: CustomizerControlsContext = {};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  children?: ReactNode;
};

export function CustomizerControlsProvider({
  children,
}: CustomizerControlsProviderProps) {
  const value = useMemo(() => {
    return {};
  }, []);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}
