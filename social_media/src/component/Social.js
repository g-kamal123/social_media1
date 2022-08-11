import React, { useContext, useState } from "react";
import Feeds from "./Feeds";
import Navbar from "./Navbar";
import { Storage } from "./Storage";
import classes from "./styles/Social.module.css";
import Trending from "./Trending";

function Social() {
  const detail = useContext(Storage);
  const [tweetContent, setTweetContent] = useState("");
  const [getimage, setGetImage] = useState("");
  const uploadImg = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const newBlob = new Blob([img], {type: "response.data.type"});
      setGetImage(URL.createObjectURL(newBlob));
      document.getElementById('chhotaImage').style.display='block'
    }
  };
  // console.log(getimage);
  return (
    <div className={classes.social}>
      <Navbar />
      <div className={classes.postSection}>
        <div className={classes.tweet}>
          <div>
            <i
              className="fa-solid fa-circle-user"
              style={{ color: "#1D9BF0", fontSize: "3rem" }}
            ></i>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              detail.tweetHandler(tweetContent, getimage);
              setGetImage('')
              setTweetContent('')
              document.getElementById('chhotaImage').style.display ='none'
            }}
          >
            <textarea
              placeholder="What's happening?"
              value={tweetContent}
              onChange={(event) => {
                setTweetContent(event.target.value);
                var btn = document.getElementById("tweetButton");
                if (event.target.value !== "") {
                  btn.disabled = false;
                  btn.style.backgroundColor = "#1D9BF0";
                  btn.style.cursor = "pointer";
                } else {
                  btn.disabled = true;
                  btn.style.backgroundColor = "#88b5d3";
                  btn.style.cursor = "initial";
                }
              }}
              required
            ></textarea>
            <hr />
            <div className={classes.imageUpload}>
              <label htmlFor="file-input">
                <i
                  className="fa-regular fa-image"
                  style={{ color: "blue", fontSize: "2rem" }}
                ></i>
                <img src={getimage} alt='' id="chhotaImage" hidden/>
              </label>
              <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                onChange={uploadImg}
              />
               
              <button type="submit" disabled id="tweetButton">
                Tweet
              </button>
            </div>
          </form>
        </div>
        <Feeds />
      </div>
      <Trending />
    </div>
  );
}

export default Social;
