import { useContext } from 'react';
import { DialogContext } from './DialogContext';

export function useDialog() {
  return useContext(DialogContext);
}
