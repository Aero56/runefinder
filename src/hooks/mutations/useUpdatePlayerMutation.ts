import { FunctionsHttpError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { supabase } from 'api/supabase';

const useUpdatePlayerMutation = () => {
  return useMutation(async (username: string) => {
    const { error } = await supabase.functions.invoke('update-player', {
      body: { name: username },
    });

    if (error) {
      if (error instanceof FunctionsHttpError) {
        const errorStatus = error.context.status;

        switch (errorStatus) {
          case 429:
            throw new Error(
              'You already updated your player in the last minute, try again later.',
            );
          case 404:
            throw new Error('Player not found!');
          default:
            throw new Error('Something went wrong!');
        }
      } else {
        throw new Error('Something went wrong!');
      }
    }
  });
};

export default useUpdatePlayerMutation;
