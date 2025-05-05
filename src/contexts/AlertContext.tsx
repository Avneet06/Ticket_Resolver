import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Alert, AlertType } from '../lib/types';

type AlertAction =
  | { type: 'ADD_ALERT'; payload: Alert }
  | { type: 'REMOVE_ALERT'; payload: string };

interface AlertContextType {
  alerts: Alert[];
  addAlert: (type: AlertType, message: string) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

function alertReducer(state: Alert[], action: AlertAction): Alert[] {
  switch (action.type) {
    case 'ADD_ALERT':
      return [...state, action.payload];
    case 'REMOVE_ALERT':
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);

  const addAlert = useCallback((type: AlertType, message: string) => {
    const id = Date.now().toString();
    dispatch({
      type: 'ADD_ALERT',
      payload: { id, type, message }
    });

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_ALERT', payload: id });
    }, 5000);
  }, []);

  const removeAlert = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ALERT', payload: id });
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}