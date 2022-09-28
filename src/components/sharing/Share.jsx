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
  const [shareUrl, setShareUrl] = React.useState(
    "https://rugrats-grace-shopper.herokuapp.com/"
  );
  // console.log(window.location.href);
  return (
    <div className="shareButtons">
      <FacebookShareButton
        url={shareUrl}
        quote={"Check out what the Rugrats made!"}
        onClick={() => {
          // setShareUrl(window.location.href);
        }}
      >
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton
        url={shareUrl}
        quote={"Check out what the Rugrats made!"}
        onClick={() => {
          // setShareUrl(window.location.href);
        }}
      >
        <LinkedinIcon size={30} round={true} />
      </LinkedinShareButton>
      <RedditShareButton
        url={shareUrl}
        quote={"Check out what the Rugrats made!"}
        onClick={() => {
          // setShareUrl(window.location.href);
        }}
      >
        <RedditIcon size={30} round={true} />
      </RedditShareButton>
      <TwitterShareButton
        url={shareUrl}
        quote={"Check out what the Rugrats made!"}
        onClick={() => {
          // setShareUrl(window.location.href);
        }}
      >
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>
    </div>
  );
};

export default Share;
