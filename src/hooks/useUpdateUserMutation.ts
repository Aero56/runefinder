import { supabase } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

interface UpdateUserProps {
  email?: string;
  password?: string;
}

const useUpdateUserMutation = () => {
  return useMutation(async ({ email, password }: UpdateUserProps) => {
    const { error } = await supabase.auth.updateUser({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  });
};

export default useUpdateUserMutation;
