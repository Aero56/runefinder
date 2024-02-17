import { UserIcon } from '@heroicons/react/20/solid';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { MouseEvent, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { canJoinGroup } from '../utils/groups';

import { DIALOG_SET_USERNAME } from './Dialogs/SetUsername';
import { EXPERIENCE_TYPES } from './ExperienceSelect';
import { GAMEMODES } from './ModeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';

import queryClient from 'api/queryClient';
import { supabase } from 'api/supabase';
import { useAuth } from 'contexts/AuthContext';
import useUpdateUserMutation from 'hooks/mutations/useUpdateUserMutation';
import { SCREEN_SM, SCREEN_XS } from 'types/generic';
import { Group as GroupType } from 'types/groups';

interface AvatarStackUser {
  id: string | null;
  username?: string;
}

interface GroupProps {
  group: GroupType;
}

const Group = ({ group }: GroupProps) => {
  const { user, data } = useAuth();
  const navigate = useNavigate();

  const isScreenXs = useMediaQuery({ query: `(max-width: ${SCREEN_XS}px)` });
  const isScreenSm = useMediaQuery({ query: `(max-width: ${SCREEN_SM}px)` });
  const avatarStackLimit = isScreenXs ? 3 : isScreenSm ? 8 : 15;

  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } =
    useUpdateUserMutation();

  const handleJoinGroup = async (group: GroupType) => {
    if (!user) {
      navigate('?signin');
      return;
    }

    if (!data?.username) {
      navigate(`?${DIALOG_SET_USERNAME}`);
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

    const channel = supabase.channel(group.id);

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        channel.send({
          type: 'broadcast',
          event: 'update',
          payload: { message: `${data.username} joined the group!` },
        });
      }
    });

    queryClient.invalidateQueries(['groups']);
    queryClient.invalidateQueries(['group', group.id]);
    queryClient.invalidateQueries(['player', user!.id]);
  };

  const handleLeaveGroup = async (group: GroupType, shouldClose?: boolean) => {
    if (!group || !data) {
      return;
    }

    try {
      await updateUser({ group: null });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }

    if (shouldClose) {
      toast(`You closed group "${group.name}"!`);
    } else {
      toast(`You left group "${group.name}"!`);
    }

    const channel = supabase.channel(group.id);

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        channel.send({
          type: 'broadcast',
          event: 'update',
          payload: {
            message: shouldClose
              ? `${data.username} closed the group!`
              : `${data.username} left the group!`,
          },
        });
      }
    });

    queryClient.invalidateQueries(['groups']);
    queryClient.invalidateQueries(['group', group.id]);
    queryClient.invalidateQueries(['player', user!.id]);
  };

  const avatars = useMemo(() => {
    const avatars: Array<AvatarStackUser | null> = group.users
      .slice(0, avatarStackLimit)
      .map((user) => ({ id: user.id, username: user.username ?? undefined }));

    for (
      let i = avatars.length;
      i < (group.size > avatarStackLimit ? avatarStackLimit : group.size);
      i++
    ) {
      avatars.push(null);
    }

    return avatars;
  }, [avatarStackLimit, group]);

  return (
    <div
      key={group.id}
      className="cursor-pointer rounded-xl border border-black-pearl-800 bg-black-pearl-900 p-4 transition-colors duration-300 hover:bg-black-pearl-800/60"
      onClick={() => navigate(`/group/${group.id}`)}
    >
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 flex-col text-left">
          <h1 className="line-clamp-2 overflow-hidden text-ellipsis font-bold">
            {group.name}
          </h1>
          <p>{group.activity.name}</p>
          <div className="avatar-group mt-2 w-fit -space-x-4 rounded-full bg-black-pearl-950 rtl:space-x-reverse">
            {avatars.map((avatar, index) => {
              if (!avatar) {
                return (
                  <div key={index} className="avatar border-black-pearl-950">
                    <UserIcon className="w-8 bg-black-pearl-900 p-1 text-black-pearl-800/50" />
                  </div>
                );
              }

              return (
                <Tooltip key={avatar.id}>
                  <TooltipTrigger className="avatar border-black-pearl-950">
                    <div
                      onClick={(event: MouseEvent) => {
                        event.stopPropagation();
                        navigate(`/player/${avatar.id}`);
                      }}
                    >
                      <UserIcon
                        className={`w-8 bg-black-pearl-800 p-1 hover:bg-black-pearl-700 ${
                          avatar.id === user?.id ? 'text-anzac-400' : ''
                        }`}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black-pearl-950 fill-black-pearl-950">
                    {avatar.username}
                  </TooltipContent>
                </Tooltip>
              );
            })}
            {group.size > avatarStackLimit && (
              <div className="avatar placeholder border-black-pearl-950">
                <div className="w-8 bg-black-pearl-900 text-sm">
                  <span>+{group.size - avatarStackLimit}</span>
                </div>
              </div>
            )}
          </div>
          {group.kills && (
            <p className="mt-2 text-sm text-red-500">
              Minimum kills to join: {group.kills}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="badge  bg-blue-600">{`World: ${group.world}`}</div>
            <div
              className={`badge badge-outline text-black-pearl-950 ${
                group.split ? 'bg-anzac-400' : 'bg-black-pearl-50'
              }`}
            >
              {group.split ? 'Split' : 'FFA'}
            </div>
            {group.level && (
              <div className="badge badge-outline border-anzac-400 text-anzac-400">
                {
                  EXPERIENCE_TYPES.find((type) => type.value === group.level)
                    ?.label
                }
              </div>
            )}
            {group.gamemode && (
              <div className="badge badge-outline border-red-500 text-red-500">
                {GAMEMODES.find((type) => type.value === group.gamemode)?.label}
              </div>
            )}
          </div>
        </div>

        {group.created_by.id === user?.id ? (
          <button
            className="btn w-12 rounded-full border-red-500 bg-red-500/20 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-black-pearl-50 xs:w-24 xs:rounded-btn"
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              handleLeaveGroup(group, true);
            }}
          >
            {!isUpdateUserLoading ? (
              <div className="flex items-center justify-between gap-2">
                <LockClosedIcon className="h-5 w-5 [&>path]:stroke-[2.5]" />
                <p className="hidden xs:block">Close</p>
              </div>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        ) : group.users.find((currentUser) => currentUser.id === user?.id) ? (
          <button
            className="btn w-12 rounded-full border-red-500 bg-red-500/20 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-black-pearl-50 xs:w-24 xs:rounded-btn"
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              handleLeaveGroup(group);
            }}
          >
            {!isUpdateUserLoading ? (
              <div className="flex items-center justify-between gap-2">
                <ArrowRightOnRectangleIcon className="h-5 w-5 [&>path]:stroke-[2.5]" />
                <p className="hidden xs:block">Leave</p>
              </div>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        ) : (
          <button
            className="btn w-12 rounded-full border-black-pearl-700 bg-black-pearl-800 hover:border-black-pearl-700 hover:bg-black-pearl-700 disabled:bg-black-pearl-800 xs:w-24 xs:rounded-btn"
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              handleJoinGroup(group);
            }}
            disabled={data?.stats ? !canJoinGroup(group, data) : false}
          >
            {!isUpdateUserLoading ? (
              <div className="flex items-center justify-between gap-2">
                <ArrowLeftOnRectangleIcon className="h-5 w-5 [&>path]:stroke-[2.5]" />
                <p className="hidden xs:block">Join</p>
              </div>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Group;
