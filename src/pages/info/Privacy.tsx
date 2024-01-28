const Privacy = () => {
  return (
    <div className="container mb-16 gap-3 pt-4">
      <h1 className="font text-4xl font-semibold text-anzac-400">
        Privacy Policy
      </h1>

      <p className="my-6 mt-2">
        <em>Last Modified: 12/01/2024</em>
      </p>

      <h2 className="my-6 text-2xl font-semibold">1. Introduction:</h2>

      <p className="mb-4">
        For all purposes, this Privacy Policy shall be the original, governing
        instrument, and understanding of the parties.
      </p>
      <p className="mb-4">
        RuneFinder is a free fan made service for RuneScape, the video game. It
        is made to allow people to connect and play together more easily. This
        privacy policy explains how your data is used by this application.
      </p>
      <p>
        RuneFinder is constantly improving, and the developer may modify this
        Privacy Policy from time to time to reflect changes in their privacy
        practices. You are encouraged to review this Privacy Policy periodically
        and to check the date of the Privacy Policy for the most recent version.
      </p>

      <h2 className="my-6 text-2xl font-semibold">2. Information Collected:</h2>

      <h3 className="mb-2 text-lg">1. Information provided by you</h3>

      <p className="mb-4">
        Your email address is used for the sole purpose of authenticating and
        authorizing access to RuneFinder. Additionally Google may be used as an
        authentication method, which will also gather your email address but no
        additional information.
      </p>

      <p>
        Your RuneScape username is used to load and display your profile. At no
        point are your private credentials collected or used.
      </p>

      <h3 className="mb-2 mt-6 text-lg">
        2. Information automatically collected
      </h3>

      <p>
        Data regarding your usage of the services provided including your IP
        address, geographical location, browser name and version, operating
        system, referral source, length of visit, page views, and navigation
        paths, as well as information about the timing, frequency, and pattern
        of your service use.
      </p>

      <h2 className="my-6 text-2xl font-semibold">3. Use of Information:</h2>

      <h3 className="mb-2 text-lg">1. RuneScape account info</h3>

      <p className="mb-4">
        In order to display and manipulate RuneScape game information,
        RuneFinder uses the RuneScape API. The only information RuneFinder
        receives, or has access to, is your game information (levels, kill
        counts, etc.). The developer does not have access to your account email,
        real name, address, payment information, or any other personal
        information held by Jagex.
      </p>

      <h3 className="mb-2 text-lg">2. Google</h3>

      <p className="mb-4">
        Google may be used as an authentication method which will only gather
        your email address for the purpose of identifying yourself.
      </p>

      <h2 className="my-6 text-2xl font-semibold">4. Third-Party Access:</h2>

      <p>
        The information collected is not shared with any third parties unless
        required for the functionality of RuneFinder. Any third-party access is
        strictly limited to the purposes of authentication and authorization.
      </p>

      <h2 className="my-6 text-2xl font-semibold">5. Security Measures:</h2>

      <p>
        The security of your data is taken seriously, and measures such as
        encryption and secure storage are implemented to protect the information
        obtained.
      </p>

      <h2 className="my-6 text-2xl font-semibold">6. User Control:</h2>

      <p>Users have control over their data and can:</p>
      <ul className="list-inside list-disc indent-6">
        <li>Revoke access through Google Account settings</li>
        <li>Delete their RuneFinder account</li>
      </ul>

      <h2 className="my-6 text-2xl font-semibold">7. Contact Information:</h2>

      <p>
        If users have any questions or concerns regarding this privacy policy,
        they can contact RuneFinder at
        <a href="mailto:support@runefinder.net" className="mx-1 text-anzac-400">
          support@runefinder.net
        </a>
        or through
        <a
          href="https://discord.gg/Dcfyf4HfqZ"
          target="_blank"
          className="ml-1 text-anzac-400"
        >
          Discord
        </a>
        .
      </p>
    </div>
  );
};

export default Privacy;
