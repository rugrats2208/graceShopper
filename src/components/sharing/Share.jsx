import React from "react";
import "./style.css";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const Share = () => {
  const shareUrl = "https://rugrats-grace-shopper.herokuapp.com/";
  return (
    <div className="shareButtons">
      <FacebookShareButton
        url={shareUrl}
        quote={"Check out what the Rugrats made!"}
      >
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton
        url={shareUrl}
        quote={"Check out what the Rugrats made!"}
      >
        <LinkedinIcon size={30} round={true} />
      </LinkedinShareButton>
      <RedditShareButton
        url={shareUrl}
        quote={"Check out what the Rugrats made!"}
      >
        <RedditIcon size={30} round={true} />
      </RedditShareButton>
      <TwitterShareButton
        url={shareUrl}
        quote={"Check out what the Rugrats made!"}
      >
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>
    </div>
  );
};

export default Share;
