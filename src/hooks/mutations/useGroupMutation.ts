import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';

interface GroupMutationProps {
  name: string;
  size: number;
  type?: number | null;
}

const useGroupMutation = () => {
  const { user } = useAuth();

  return useMutation(async ({ name, size, type }: GroupMutationProps) => {
    if (!user) {
      throw new Error('You must be logged in to do this.');
    }

    const { data, error } = await supabase
      .from('groups')
      .insert({ name, size, type, created_by: user.id })
      .select('id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};

export default useGroupMutation;
