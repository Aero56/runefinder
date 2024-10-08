import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNowStrict } from 'date-fns';
import { MouseEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { canJoinGroup } from '../utils/groups';

import queryClient from 'api/queryClient';
import { supabase } from 'api/supabase';
import EditGroup from 'components/Dialogs/EditGroup';
import { DIALOG_SET_USERNAME } from 'components/Dialogs/SetUsername';
import { EXPERIENCE_TYPES } from 'components/ExperienceSelect';
import GroupPlayer from 'components/GroupPlayer';
import GroupSkeleton from 'components/LoadingSkeletons/GroupSkeleton';
import { GAMEMODES } from 'components/ModeSelect';
import { useAuth } from 'contexts/AuthContext';
import useUpdateUserMutation from 'hooks/mutations/useUpdateUserMutation';
import useGroupQuery from 'hooks/queries/useGroupQuery';

const Group = () => {
  const { user, data } = useAuth();
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const { data: group, isLoading } = useGroupQuery(id);

  const [timeOpen, setTimeOpen] = useState<string | null>(null);

  useEffect(() => {
    if (group) {
      const createdAt = new Date(group.created_at);

      const interval = setInterval(() => {
        setTimeOpen(formatDistanceToNowStrict(createdAt));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [group]);

  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } =
    useUpdateUserMutation();

  useEffect(() => {
    if (group) {
      const channel = supabase.channel(group.id);

      channel
        .on('broadcast', { event: 'update' }, ({ payload }) => {
          queryClient.invalidateQueries(['group', id]);
          toast(payload.message);
        })
        .on('broadcast', { event: 'kick' }, ({ payload }) => {
          if (user && payload.player.id === user.id) {
            toast('You were kicked from the group!');
            queryClient.invalidateQueries(['group', id]);
            queryClient.invalidateQueries(['player', user.id]);
            return;
          }

          toast(`${payload.player.username} was kicked from the group!`);
          queryClient.invalidateQueries(['group', id]);
        })
        .on(
          'postgres_changes',
          {
            schema: 'public',
            table: 'groups',
            event: 'UPDATE',
            filter: `id=eq.${group.id}`,
          },
          (payload) => {
            if (payload.new.status !== 'closed') {
              queryClient.invalidateQueries(['group', id]);
              toast('Group was updated!');
            }
          },
        )
        .subscribe();

      return () => {
        channel.unsubscribe();
      };
    }
  }, [id, user, group]);

  const handleJoinGroup = async () => {
    if (!group) {
      return;
    }

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

  const handleLeaveGroup = async (shouldClose?: boolean) => {
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

  if (isLoading) {
    return <GroupSkeleton />;
  }

  if (!group) {
    return (
      <div className="flex h-[calc(100vh-128px)] items-center justify-center sm:h-[calc(100vh-64px)]">
        <div className="flex flex-col gap-3 p-4 text-center">
          <h1 className="text-4xl font-bold text-anzac-400 sm:text-6xl">
            Oops!
          </h1>
          <p className="text-xl sm:text-2xl">This group does not exist.</p>
        </div>
      </div>
    );
  }

  const playersNeeded = group.size - group.users.length;

  return (
    <div className="container mb-4 flex flex-col gap-4 px-4 pt-4">
      {group.status !== 'closed' && (
        <div className="flex justify-between">
          <Link to="/groups" className="btn btn-ghost flex">
            <ArrowLeftIcon className="h-4 w-4 [&>path]:stroke-[2.5]" />
            <p>Back to groups</p>
          </Link>
          {group.created_by.id === user?.id ? (
            <button
              className="btn w-40 border-red-500 bg-red-500/20 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-black-pearl-50"
              onClick={(event: MouseEvent) => {
                event.stopPropagation();
                handleLeaveGroup(true);
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
              className="btn w-40 border-red-500 bg-red-500/20 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-black-pearl-50"
              onClick={(event: MouseEvent) => {
                event.stopPropagation();
                handleLeaveGroup();
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
              className="btn btn-primary w-32 p-0 font-bold disabled:bg-black-pearl-900 xs:w-36"
              onClick={(event: MouseEvent) => {
                event.stopPropagation();
                handleJoinGroup();
              }}
              disabled={data?.stats ? !canJoinGroup(group, data) : false}
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
      )}
      <div className="overflow-hidden rounded-xl bg-black-pearl-900">
        <div className="relative h-44">
          <img
            src={
              new URL(
                `../assets/banners/${group.activity.value}.webp`,
                import.meta.url,
              ).href
            }
            className="absolute h-44 w-full object-cover object-top"
          ></img>
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent from-20% to-black-pearl-900 to-95%" />
          <div className="absolute z-10 flex w-full justify-end p-4">
            {group.status === 'closed' && (
              <div className="badge badge-outline badge-lg flex gap-1 bg-red-950/60 py-4 font-semibold text-red-500">
                <LockClosedIcon className="h-4 w-4 [&>path]:stroke-[2.5]" />
                Closed
              </div>
            )}

            {group.status !== 'closed' && timeOpen && (
              <div className="flex items-center gap-2">
                <p className="leading-3">{timeOpen}</p>
                <ClockIcon className="h-5 w-5 [&>path]:stroke-[2.5]" />
              </div>
            )}

            {group.status !== 'closed' && user?.id === group.created_by.id && (
              <EditGroup group={group} />
            )}
          </div>
          <div className="absolute flex h-full max-w-full flex-col justify-end p-4">
            <p className="text-md font-bold text-anzac-400 xs:text-lg">
              {group.activity.name}
            </p>
            <p
              className="line-clamp-2 break-words text-2xl font-bold xs:text-3xl"
              title={group.name}
            >
              {group.name}
            </p>
            {group.kills && (
              <p className="mt-2 text-sm text-red-500">
                Minimum kills to join: {group.kills}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 px-4 pb-4">
          <div className="flex flex-wrap gap-3">
            <div className="badge bg-blue-600">{`World: ${group.world}`}</div>
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
      </div>
      <div className="rounded-xl bg-black-pearl-900">
        <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
          Players
        </div>
        <div className="flex flex-col gap-3 p-4">
          <GroupPlayer group={group} player={group.created_by} isHost />
          {!(group.status === 'closed' && group.users.length < 1) && (
            <div className="divider my-2">
              {group.status === 'closed'
                ? 'Group is closed'
                : playersNeeded > 0
                  ? `Looking for ${playersNeeded} ${
                      playersNeeded === 1 ? ' player' : ' players'
                    }`
                  : 'Group is full'}
            </div>
          )}
          {group.users
            .filter((user) => user.id !== group.created_by.id)
            .map((user) => (
              <GroupPlayer key={user.id} group={group} player={user} />
            ))}
          {group.status !== 'closed' &&
            [...Array(playersNeeded)].map((_, index) => (
              <div
                key={index}
                className="skeleton flex h-[88px] flex-col justify-center rounded-xl border-2 border-black-pearl-800 bg-black-pearl-950/60 opacity-50"
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
