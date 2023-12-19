import { FunctionsHttpError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { supabase } from 'api/supabase';

interface KickPlayerMutationProps {
  userId: string;
  groupId: string;
}

const useKickPlayerMutation = () => {
  return useMutation(async ({ userId, groupId }: KickPlayerMutationProps) => {
    const { error } = await supabase.functions.invoke('kick-player', {
      body: { userId, groupId },
    });

    if (error) {
      if (error instanceof FunctionsHttpError) {
        const errorStatus = error.context.status;

        switch (errorStatus) {
          case 401:
            throw new Error('You are not authorized to do this.');
          default:
            throw new Error('Something went wrong!');
        }
      } else {
        throw new Error('Something went wrong!');
      }
    }
  });
};

export default useKickPlayerMutation;
