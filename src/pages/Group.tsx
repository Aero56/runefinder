import { useEffect } from 'react';
import { toast } from 'react-hot-toast/headless';
import { useParams } from 'react-router-dom';

import { Group as GroupType } from '@/types/groups';
import queryClient from '@api/queryClient';
import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';
import useGroupQuery from '@hooks/queries/useGroupQuery';

const Group = () => {
  const { user } = useAuth();
  const { id = '' } = useParams();

  const { data: group, isLoading } = useGroupQuery(id);

  useEffect(() => {
    supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `group_id=eq.${id}`,
        },
        (payload) => {
          if (payload.new.id !== user?.id) {
            queryClient.setQueryData(
              ['group', id],
              (oldData?: GroupType | null) => {
                const newUser = {
                  id: payload.new.id,
                  username: payload.new.username,
                };

                if (oldData) {
                  const users = [...oldData.users];

                  if (!users.some((user) => user.id === newUser.id)) {
                    users.push(newUser);
                  }

                  return { ...oldData, users };
                }

                return null;
              },
            );

            toast(`${payload.new.username} has joined the group!`);
          }
        },
      )
      .subscribe();
  }, [id, user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!group) {
    return <p>This group does not exist.</p>;
  }

  return (
    <div className="flex flex-col">
      {group.name}
      <p>{group.users.map((user) => user.username).join(', ')}</p>
    </div>
  );
};

export default Group;
