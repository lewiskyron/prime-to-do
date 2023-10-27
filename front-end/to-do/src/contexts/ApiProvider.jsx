import { createContext, useContext } from 'react';
import TodoApiClient from '../PrimeTodoClient.jsx';

const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const api = new TodoApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}