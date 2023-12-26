import { useMutation } from '@tanstack/react-query';

import { supabase } from 'api/supabase';
import { AuthProviders } from 'types/supabase';

interface LoginWithProviderMutationProps {
  provider: AuthProviders;
  isSignup?: boolean;
}

const useLoginWithProviderMutation = () => {
  return useMutation(
    async ({ provider, isSignup }: LoginWithProviderMutationProps) => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: isSignup
            ? `${window.location.origin}?set-username`
            : window.location.origin,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  );
};

export default useLoginWithProviderMutation;
