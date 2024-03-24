"use client";


import type { ReactNode } from "react";
import {  createContext, useRef, useContext } from "react";
import type { StoreApi } from "zustand";
import {  useStore } from "zustand";

import type { UserStore } from "@/zustand/stores/user-store";
import { createUserStore, initUserStore } from "@/zustand/stores/user-store";



export const UserStoreContext = createContext<StoreApi<UserStore> | null>(
  null,
);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({
  children,
}: UserStoreProviderProps) => {
  const storeRef = useRef<StoreApi<UserStore>>();
  if (!storeRef.current) {
    storeRef.current = createUserStore(initUserStore());
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(
  selector: (store: UserStore) => T,
): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error("useUserStore must be use within UserStoreProvider");
  }

  return useStore(userStoreContext, selector);
};
