import { useMutation } from '@tanstack/react-query';

import { supabase } from 'api/supabase';
import { Experience } from 'components/ExperienceSelect';
import { Mode } from 'components/ModeSelect';
import { useAuth } from 'contexts/AuthContext';
import { Raid } from 'types/raids';

interface GroupMutationProps {
  name: string;
  size: number;
  type: Raid | null;
  level: Experience | null;
  mode: Mode | null;
  world: number;
}

const useGroupMutation = () => {
  const { user } = useAuth();

  return useMutation(
    async ({ name, size, type, level, mode, world }: GroupMutationProps) => {
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
          level: level as Experience, // @todo fix these types
          mode: mode as Mode,
          world,
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

export default useGroupMutation;
