import { AuthProviders } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

const useLoginWithProviderMutation = () => {
  return useMutation(async (provider: AuthProviders) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      throw new Error(error.message);
    }
  });
};

export default useLoginWithProviderMutation;
