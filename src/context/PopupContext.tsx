import React, { useContext, useState } from "react";

const PopupContext = React.createContext<{
  openPopups: Set<PopupKey>;
  isOpen: (key: PopupKey) => boolean;
}>({
  openPopups: new Set(),
  isOpen: () => false,
});

const PopupUpdateContext = React.createContext<{
  open: (key: PopupKey) => void;
  close: (key: PopupKey) => void;
}>({
  open: () => {},
  close: () => {},
});

export function usePopups() {
  return useContext(PopupContext);
}

export function usePopupsUpdate() {
  return useContext(PopupUpdateContext);
}

export type PopupKey = "dms" | "users" | "addusers" | "edituser";

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [openPopups, setOpenPopups] = useState<Set<PopupKey>>(new Set());

  const open = (key: PopupKey) =>
    setOpenPopups((prev) => new Set(prev).add(key));

  const close = (key: PopupKey) => {
    setOpenPopups((prev) => {
      let next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const isOpen = (key: PopupKey): boolean => openPopups.has(key);

  return (
    <PopupContext.Provider value={{ openPopups, isOpen }}>
      <PopupUpdateContext.Provider value={{ open, close }}>
        {children}
      </PopupUpdateContext.Provider>
    </PopupContext.Provider>
  );
};
