import "./footer.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <p>
          Copyright © 2023 All rights reserved | made with{" "}
          <span style={{ color: "red" }}>♥ </span>by Roczyno
        </p>
        <div className="icons">
          <div className="icon-item">
            <FacebookOutlinedIcon className="icon" />
          </div>
          <div className="icon-item">
            <GitHubIcon className="icon" />
          </div>
          <div className="icon-item">
            <TwitterIcon className="icon" />
          </div>
          <div className="icon-item">
            <InstagramIcon className="icon" />
          </div>
          <div className="icon-item">
            <LinkedInIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
