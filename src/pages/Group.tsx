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
import { EXPERIENCE_TYPES } from 'components/ExperienceSelect';
import GroupPlayer from 'components/GroupPlayer';
import { MODES } from 'components/ModeSelect';
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
            queryClient.invalidateQueries(['group', id]);
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

  const playersNeeded = group.size - group.users.length;

  return (
    <div className="container mb-4 flex flex-col gap-4 pt-4">
      <div className="flex justify-end">
        {group.created_by.id === user?.id ? (
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
        <div className="relative h-44">
          <img
            src={`src/assets/banners/${group.type.value}.png`}
            className="absolute h-44 w-full object-cover object-top"
          ></img>
          <div className="absolute h-44 w-full shadow-[inset_0_-80px_80px_0px_theme(colors.black-pearl.900)]" />
          <div className="absolute flex h-full flex-col justify-end p-4">
            <p className="text-lg font-bold text-anzac-400">
              {group.type.name}
            </p>
            <p className="line-clamp-2 text-3xl font-bold">{group.name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-4 pb-4">
          <div className="flex flex-wrap gap-3">
            <div className="badge  bg-blue-600">{`World: ${group.world}`}</div>
            {group.level && (
              <div className="badge badge-outline border-anzac-400 text-anzac-400">
                {
                  EXPERIENCE_TYPES.find((type) => type.value === group.level)
                    ?.label
                }
              </div>
            )}
            {group.mode && (
              <div className="badge badge-outline border-red-500 text-red-500">
                {MODES.find((type) => type.value === group.mode)?.label}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-black-pearl-900">
        <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
          Players
        </div>
        <div className="flex flex-col gap-3 p-4">
          <GroupPlayer group={group} player={group.created_by} isHost />
          <div className="divider my-2">
            {playersNeeded > 0
              ? `Looking for ${playersNeeded} ${
                  playersNeeded === 1 ? ' player' : ' players'
                }`
              : 'Group is full'}
          </div>
          {group.users
            .filter((user) => user.id !== group.created_by.id)
            .map((user) => (
              <GroupPlayer group={group} player={user} />
            ))}
          {[...Array(playersNeeded)].map((_, index) => (
            <div
              key={index}
              className="skeleton flex flex-col rounded-xl border-2 border-black-pearl-800 bg-black-pearl-950/60 p-7 opacity-50"
            >
              <p className="text-center">Waiting for player to join...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;
