import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import { Storage } from "./Storage";
import classes from "./styles/Feeds.module.css";
import classes1 from './styles/Social.module.css'

function Feeds() {
  const detail = useContext(Storage);
  const [tweetContent, setTweetContent] = useState("");
  const [getimage, setGetImage] = useState("");
  const uploadImg = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const newBlob = new Blob([img], { type: "response.data.type" });
      setGetImage(URL.createObjectURL(newBlob));
      document.getElementById("chhotaImage").style.display = "block";
    }
  };
  return (
    <>
    <div className={classes1.tweet}>
          <div>
            <i
              className="fa-solid fa-circle-user"
              style={{ color: "#1D9BF0", fontSize: "3rem" }}
            ></i>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              detail.tweetHandler(tweetContent, getimage);
              setGetImage("");
              setTweetContent("");
              document.getElementById("chhotaImage").style.display = "none";
              let btn = document.getElementById('tweetButton')
              btn.disabled = true;
              btn.style.backgroundColor = "#88b5d3";
              btn.style.cursor = "initial";
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
            <div className={classes1.imageUpload}>
              <label htmlFor="file-input">
                <i
                  className="fa-regular fa-image"
                  style={{ color: "blue", fontSize: "2rem" }}
                ></i>
                <img src={getimage} alt="" id="chhotaImage" hidden />
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
    <ul className={classes.feeds}>
      {detail.postsData.map((item) => (
        <>
          <hr />
          <li className={detail.mode && classes.mode}>
            <i className="fa-solid fa-circle-user"></i>
            <div className={classes.content}>
              <div className={classes.title}>
                <p className={classes.tag}>
                  <h4>{item.author}</h4>
                  <span>@kamalnayanrai3.</span>
                  <span>1h</span>
                </p>
                {/* <div className={classes.operation}>
                <span className={classes.threedots}>...</span>
                <p style={{display:'none'}}>
                <span>Edit</span>
                <span>Delete</span>
                </p>
                </div> */}
              </div>
              <Link to="/feed/FeedDetails" state={{ feed: item }}>
              <p className={classes.textContent} onClick={() => detail.fetchComment(item)}>{item.content}</p>
              </Link>
              <img src={item.image} alt="" />
              <hr />
              <p className={classes.action}>
                <Link to="/FeedDetails" state={{ feed: item }}>
                  <i
                    className="fa-solid fa-comment"
                    onClick={() => detail.fetchComment(item)}
                  ></i>
                </Link>
                <i className="fa-solid fa-retweet"></i>
                <i
                  className={`fa-solid fa-heart ${item.liked[detail.user]===1 && classes.active
                  }`}
                  onClick={() => detail.addLike(item)}
                ></i>
              </p>
            </div>
          </li>
        </>
      ))}
    </ul>
    </>
  );
}

export default Feeds;
