import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';

interface UpdateUserMutationProps {
  group: string | null;
}

const useUpdateUserMutation = () => {
  const { user } = useAuth();

  return useMutation(async ({ group }: UpdateUserMutationProps) => {
    if (!user) {
      throw new Error('You must be logged in to do this.');
    }

    const { data, error } = await supabase
      .from('users')
      .update({ group_id: group })
      .eq('id', user.id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};

export default useUpdateUserMutation;
