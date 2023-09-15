import { supabase } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

interface LoginProps {
  email: string;
  password: string;
}

const useLoginMutation = () => {
  return useMutation(async ({ email, password }: LoginProps) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  });
};

export default useLoginMutation;
