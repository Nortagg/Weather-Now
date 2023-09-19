import "./links.styles.scss";
import { BsInstagram, BsFacebook, BsGithub } from "react-icons/bs";

const MediaLinks = () => {
  return (
    <div className="links-container">
      <a
        href="https://www.instagram.com/lezaic_n/"
        target="_blank"
        rel="noopener"
      >
        <BsInstagram />
      </a>
      <a
        href="https://www.facebook.com/nikola.lezaic"
        target="_blank"
        rel="noopener"
      >
        <BsFacebook />
      </a>
      <a href="https://github.com/Nortagg" target="_blank" rel="noopener">
        <BsGithub />
      </a>
    </div>
  );
};

export default MediaLinks;
