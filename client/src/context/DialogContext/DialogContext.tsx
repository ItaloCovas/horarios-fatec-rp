import { createContext, useState } from 'react';

interface DialogContextProps {
  open: boolean;
  openDialog(): void;
  closeDialog(): void;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

export const DialogContext = createContext({} as DialogContextProps);

export function DialogProvider({ children }: DialogProviderProps) {
  const [open, setOpen] = useState<boolean>(false);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }
  return (
    <DialogContext.Provider value={{ open, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
}
