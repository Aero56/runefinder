import { supabase } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

const useResetPasswordMutation = () => {
  return useMutation(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/settings/change-password`,
    });

    if (error) {
      throw new Error(error.message);
    }
  });
};

export default useResetPasswordMutation;
