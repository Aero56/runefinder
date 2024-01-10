const Privacy = () => {
  return (
    <div className="container mb-16 gap-3 pt-4">
      <h1 className="font text-4xl font-semibold text-anzac-400">
        Privacy Policy
      </h1>

      <p className="my-6 mt-2">
        <em>Last Modified: 10/01/2024</em>
      </p>

      <h2 className="my-6 text-2xl font-semibold">1. Introduction:</h2>

      <p>
        This privacy policy outlines how your information obtained through
        Google and Jagex is collected, used, and protected.
      </p>

      <h2 className="my-6 text-2xl font-semibold">2. Information Collected:</h2>

      <p>
        When using RuneFinder, the following information is collected provided
        by yourself:
      </p>
      <ul className="list-inside list-disc indent-6">
        <li>
          Google Account information (e.g., email address, profile information)
        </li>
        <li>
          Your RuneScape username is used to collect and display your RuneScape
          data. At no point are your private credentials collected and used.
        </li>
      </ul>

      <h2 className="my-6 text-2xl font-semibold">3. Use of Information:</h2>

      <p>
        The information obtained through Google and Jagex is used for the sole
        purpose of:
      </p>
      <ul className="list-inside list-disc indent-6">
        <li>Authenticating users</li>
        <li>Authorizing access to RuneFinder</li>
        <li>Identifying RuneScape accounts on RuneFinder</li>
      </ul>

      <h2 className="my-6 text-2xl font-semibold">4. Third-Party Access:</h2>

      <p>
        The user information obtained through Google and Jagex is not shared
        with any third parties unless required for the functionality of
        RuneFinder. Any third-party access is strictly limited to the purposes
        of authentication and authorization.
      </p>

      <h2 className="my-6 text-2xl font-semibold">5. Security Measures:</h2>

      <p>
        The security of your data is taken seriously, and measures such as
        encryption and secure storage are implemented to protect the information
        obtained through Google and Jagex.
      </p>

      <h2 className="my-6 text-2xl font-semibold">6. User Control:</h2>

      <p>Users have control over their data and can:</p>
      <ul className="list-inside list-disc indent-6">
        <li>Revoke access through Google Account settings</li>
        <li>Delete their account within RuneFinder</li>
      </ul>

      <h2 className="my-6 text-2xl font-semibold">
        7. Changes to Privacy Policy:
      </h2>

      <p>
        This privacy policy may be updated at any time, any changes will be
        communicated through this page and
        <a href="#" className="ml-1 text-anzac-400">
          Discord
        </a>
        . Users are encouraged to review the policy regularly.
      </p>

      <h2 className="my-6 text-2xl font-semibold">8. Contact Information:</h2>

      <p>
        If users have any questions or concerns regarding this privacy policy,
        they can contact RuneFinder at
        <a href="mailto:support@runefinder.net" className="mx-1 text-anzac-400">
          support@runefinder.net
        </a>
        or through
        <a href="#" className="ml-1 text-anzac-400">
          Discord
        </a>
        .
      </p>
    </div>
  );
};

export default Privacy;
