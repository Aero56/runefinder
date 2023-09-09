import { supabase } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

const useUpdatePlayerMutation = () => {
  return useMutation(async (username: string) => {
    const { error } = await supabase.functions.invoke('update-player', {
      body: { name: username },
    });

    if (error) {
      throw new Error(
        'Oops! Something went wrong while updating your player data.'
      );
    }
  });
};

export default useUpdatePlayerMutation;
