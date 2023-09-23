import { createContext, useContext } from 'react';
import { ApiWithAcks } from '../types';
const ApiContext = createContext<ApiWithAcks | null>(null);

export const useApi = () => useContext(ApiContext);

export default ApiContext;
