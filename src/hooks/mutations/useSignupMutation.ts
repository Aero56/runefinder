import { useMutation } from '@tanstack/react-query';

import { supabase } from '@api/supabase';

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
