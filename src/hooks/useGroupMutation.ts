import { supabase } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

interface GroupMutationProps {
  name: string;
  size: number;
  type?: number | null;
}

const useGroupMutation = () => {
  return useMutation(async ({ name, size, type }: GroupMutationProps) => {
    const { data, error } = await supabase
      .from('groups')
      .insert({ name, size, type })
      .select('id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};

export default useGroupMutation;
