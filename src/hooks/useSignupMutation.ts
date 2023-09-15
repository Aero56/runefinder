import { supabase } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

interface LoginProps {
  email: string;
  password: string;
}

const useSignupMutation = () => {
  return useMutation(async ({ email, password }: LoginProps) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  });
};

export default useSignupMutation;
