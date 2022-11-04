import { createContext, ReactNode } from 'react';

interface UserProps {
  name: string;
  avatarUrl?: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  async function signIn() {
    console.log('Logou!');
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: 'Higor',
          avatarUrl: 'https://github.com/higordenomar.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
