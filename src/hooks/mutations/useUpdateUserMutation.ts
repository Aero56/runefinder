import { useMutation } from '@tanstack/react-query';

import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';

interface UpdateUserMutationProps {
  group?: string | null;
  description?: string | null;
}

const useUpdateUserMutation = () => {
  const { user } = useAuth();

  return useMutation(
    async ({ group, description }: UpdateUserMutationProps) => {
      if (!user) {
        throw new Error('You must be logged in to do this.');
      }

      const { data, error } = await supabase
        .from('users')
        .update({ group_id: group, description })
        .eq('id', user.id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  );
};

export default useUpdateUserMutation;
