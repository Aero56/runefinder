import { useMutation } from '@tanstack/react-query';

import { supabase } from 'api/supabase';
import { Experience } from 'components/ExperienceSelect';
import { Gamemode } from 'components/ModeSelect';
import { useAuth } from 'contexts/AuthContext';

interface GroupMutationProps {
  id: string;
  name: string;
  level: Experience | null;
  gamemode: Gamemode | null;
  world: number;
  split: boolean;
  kills?: number | null;
}

const useUpdateGroupMutation = () => {
  const { user } = useAuth();

  return useMutation(
    async ({
      id,
      name,
      level,
      gamemode,
      world,
      split,
      kills,
    }: GroupMutationProps) => {
      if (!user) {
        throw new Error('You must be logged in to do this.');
      }

      const { data, error } = await supabase
        .from('groups')
        .update({
          name,
          level,
          gamemode,
          world,
          split,
          kills,
        })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  );
};

export default useUpdateGroupMutation;
