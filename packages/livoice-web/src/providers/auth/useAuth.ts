import { useContext } from 'react';

import { AuthContext, type AuthContextType } from './authContext';

const useAuth = () => useContext<AuthContextType>(AuthContext);

export default useAuth;
