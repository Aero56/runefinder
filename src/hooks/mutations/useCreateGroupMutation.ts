import { useMutation } from '@tanstack/react-query';

import { supabase } from 'api/supabase';
import { Activity } from 'components/ActivitySelect';
import { Experience } from 'components/ExperienceSelect';
import { Gamemode } from 'components/ModeSelect';
import { useAuth } from 'contexts/AuthContext';

interface GroupMutationProps {
  name: string;
  size: number;
  type: Activity;
  level: Experience | null;
  gamemode: Gamemode | null;
  world: number;
  split: boolean;
  kills?: number | null;
}

const useCreateGroupMutation = () => {
  const { user } = useAuth();

  return useMutation(
    async ({
      name,
      size,
      type,
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
        .insert({
          name,
          size,
          type,
          created_by: user.id,
          level,
          gamemode,
          world,
          split,
          kills,
        })
        .select('id')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  );
};

export default useCreateGroupMutation;
