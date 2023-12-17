import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { MouseEvent, useEffect } from 'react';
import { toast } from 'react-hot-toast/headless';
import { useNavigate, useParams } from 'react-router-dom';

import queryClient from 'api/queryClient';
import { supabase } from 'api/supabase';
import { useAuth } from 'contexts/AuthContext';
import useUpdateUserMutation from 'hooks/mutations/useUpdateUserMutation';
import useGroupQuery from 'hooks/queries/useGroupQuery';
import { Group as GroupType } from 'types/groups';

const Group = () => {
  const { user } = useAuth();
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const { data: group, isLoading } = useGroupQuery(id);

  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } =
    useUpdateUserMutation();

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

    return () => {
      supabase.channel('table-db-changes').unsubscribe();
    };
  }, [id, user]);

  const handleJoinGroup = async (group: GroupType) => {
    if (!user) {
      navigate('?signin');
      return;
    }

    try {
      await updateUser({ group: group.id });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }

    toast(`You joined group "${group.name}"!`);
    navigate(`/group/${group.id}`);

    queryClient.invalidateQueries(['groups']);
    queryClient.invalidateQueries(['group', group.id]);
    queryClient.invalidateQueries(['user', user!.id]);
  };

  const handleLeaveGroup = async (group: GroupType) => {
    try {
      await updateUser({ group: null });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }

    toast(`You left group "${group.name}"!`);

    queryClient.invalidateQueries(['groups']);
    queryClient.invalidateQueries(['group', group.id]);
    queryClient.invalidateQueries(['user', user!.id]);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!group) {
    return <p>This group does not exist.</p>;
  }

  return (
    <div className="container flex flex-col gap-4 pt-4">
      <div className="flex justify-end">
        {group.created_by === user?.id ? (
          <button
            className="btn border-red-500 bg-red-500/20 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-black-pearl-50"
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              handleLeaveGroup(group);
            }}
          >
            {!isUpdateUserLoading ? (
              <>
                <LockClosedIcon className="h-5 w-5 [&>path]:stroke-[2.5]" />
                Close group
              </>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        ) : group.users.find((currentUser) => currentUser.id === user?.id) ? (
          <button
            className="btn border-red-500 bg-red-500/20 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-black-pearl-50"
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              handleLeaveGroup(group);
            }}
          >
            {!isUpdateUserLoading ? (
              <>
                <ArrowRightOnRectangleIcon className="h-5 w-5 [&>path]:stroke-[2.5]" />
                Leave group
              </>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        ) : (
          <button
            className="btn bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300"
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              handleJoinGroup(group);
            }}
          >
            {!isUpdateUserLoading ? (
              <>
                <ArrowLeftOnRectangleIcon className="h-5 w-5 [&>path]:stroke-[2.5]" />
                Join group
              </>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        )}
      </div>
      <div className="overflow-hidden rounded-xl bg-black-pearl-900">
        <div
          className={`h-32 w-full bg-cover bg-top shadow-[inset_0_-10px_20px_-10px_rgba(0,0,0,1)] bg-[url('assets/banners/activity_${group.type.id}.png')]`}
        ></div>
        <div className="flex flex-col p-4">
          <p className="text-xl font-bold text-anzac-400">{group.name}</p>
          <p>{group.type.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Group;
