import { Table } from '@/types/supabase';
import { supabase } from '@api/supabase';
import useUserQuery from '@hooks/queries/useUserQuery';
import { Session, User } from '@supabase/supabase-js';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContext {
  session: Session | null;
  user: User | null;
  loading: boolean;
  data?: Table<'users'> | null;
}

const AuthContext = createContext<AuthContext>({
  session: null,
  user: null,
  loading: true,
  data: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data } = useUserQuery(user?.id);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, loading, data }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
