import { createContext } from 'react';

export const DeleteAlertDialogContext = createContext();

export function DeleteAlertDialogProvider(props) {
  return (
    <DeleteAlertDialogContext.Provider value={{}}>
      {props.children}
    </DeleteAlertDialogContext.Provider>
  );
}
