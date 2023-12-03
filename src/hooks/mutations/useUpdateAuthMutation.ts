import { useMutation } from '@tanstack/react-query';

import { supabase } from '@api/supabase';

interface UpdateAuthProps {
  email?: string;
  password?: string;
}

const useUpdateAuthMutation = () => {
  return useMutation(async ({ email, password }: UpdateAuthProps) => {
    const { error } = await supabase.auth.updateUser({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  });
};

export default useUpdateAuthMutation;
