import { useParams } from 'react-router-dom';
import { supabase } from '@api/supabase';
import { useCallback, useEffect, useState } from 'react';

import { Group as GroupType } from '@/types/group';
import { toast } from 'react-hot-toast/headless';

const Group = () => {
  const { id = '' } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [group, setGroup] = useState<GroupType | null>(null);

  const getGroup = useCallback(async () => {
    console.log('test');

    const { data } = await supabase
      .from('groups')
      .select('*, users!users_group_id_fkey(id, username)')
      .eq('id', id)
      .single();

    setGroup(data ?? null);
  }, []);

  useEffect(() => {
    getGroup().then(() => setLoaded(true));

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
          setGroup((prevGroup) => {
            const newUser = {
              id: payload.new.id,
              username: payload.new.username,
            };

            if (prevGroup) {
              const users = [...prevGroup.users];

              if (!users.some((user) => user.id === newUser.id)) {
                users.push(newUser);
              }

              return { ...prevGroup, users };
            }

            return null;
          });

          toast('A player has joined the group!');
        }
      )
      .subscribe();
  }, [getGroup]);

  if (!loaded) {
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
