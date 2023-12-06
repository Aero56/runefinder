import AccountSettings from 'components/AccountSettings';
import PlayerSettings from 'components/PlayerSettings';

const Settings = () => {
  return (
    <div className="container mb-4 flex flex-col gap-4 pt-4">
      <PlayerSettings />
      <AccountSettings />
    </div>
  );
};

export default Settings;
