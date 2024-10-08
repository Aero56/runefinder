import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-base-200 p-10 text-base-content">
      <aside>
        <img
          src="/images/logo.png"
          alt="RuneFinder logo"
          className="h-12 w-12 object-contain"
        />
        <p>
          RuneFinder
          <br />
          Copyright © 2023 - All rights reserved
        </p>
      </aside>
      <nav>
        <header className="footer-title">Info</header>
        <Link to="/info" className="link-hover link">
          About
        </Link>
        <Link
          to="https://discord.gg/Dcfyf4HfqZ"
          target="_blank"
          className="link-hover link"
        >
          Discord
        </Link>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <Link to="/privacy" className="link-hover link">
          Privacy
        </Link>
      </nav>
      <nav>
        <header className="footer-title">Support 💛</header>
        <a
          href="https://patreon.com/runefinder"
          target="_blank"
          className="link-hover link"
        >
          Patreon
        </a>
        <a
          href="https://buymeacoffee.com/runefinder"
          target="_blank"
          className="link-hover link"
        >
          Buy me a coffee
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
