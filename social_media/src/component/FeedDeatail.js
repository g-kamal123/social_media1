import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Storage } from "./Storage";
import classes from "./styles/Feeds.module.css";
import { Modal } from "@mui/material";
import classes1 from "./styles/Social.module.css";

function FeedDeatail() {
  const [editModal, setEditModal] = useState(false);
  const [act, setAct] = useState("none");
  const location = useLocation();
  const [reply, setReply] = useState("");
  const detail = useContext(Storage);
  const { feed } = location.state;
  const [print,setPrint] = useState(feed)
  const [editContent, setEditContent] = useState(feed.content);
  const [editImage, setEditImage] = useState(feed.image);
  return (
    <>
      <ul className={classes.feeds}>
        <li>
          <i className="fa-solid fa-circle-user"></i>
          <div className={classes.content}>
            <div className={classes.title}>
              <p className={classes.tag}>
                <h4>{print.author}</h4>
                <span>@kamalnayanrai3.</span>
                <span>1h</span>
              </p>
              <div
                className={classes.operation}
                onMouseLeave={() => setAct("none")}
              >
                <span
                  className={classes.threedots}
                  onMouseOver={() => setAct("block")}
                >
                  ...
                </span>
                <p>
                  <span
                    style={{ display: act, cursor: "pointer", padding: "5%" }}
                    onClick={() => setEditModal(true)}
                  >
                    Edit
                  </span>
                  <span
                    style={{ display: act, cursor: "pointer", padding: "5%" }}
                    onClick={() => detail.deletePost(feed.id)}
                  >
                    Delete
                  </span>
                </p>
              </div>
            </div>
            <p className={classes.textContent}>{print.content}</p>
            <img src={print.image} alt="" />
            <hr />
            <p className={classes.action}>
              <i className="fa-solid fa-comment"></i>
              <i className="fa-solid fa-retweet"></i>
              <i className="fa-regular fa-heart"></i>
            </p>
          </div>
        </li>
        <li>
          <input
            onChange={(event) => setReply(event.target.value)}
            value={reply}
          />
          <i
            class="fa-solid fa-paper-plane"
            onClick={() => detail.replyComment(reply, feed.id)}
          ></i>
        </li>
        <ul>
          {detail.currPostComment.map((item) => (
            <li>
              <span>{item.body}</span>
              <span>{item.author}</span>
            </li>
          ))}
        </ul>
      </ul>
      <Modal open={editModal} onClose={() => setEditModal(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "white",
            padding: "2rem",
          }}
        >
          <div className={classes1.social}>
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
                  const toAdd ={
                    id:print.id,image:editImage,content:editContent,author:print.author
                  }
                  setPrint(toAdd)
                  detail.editPost(toAdd)
                  setEditModal(false)
                }}
              >
                <textarea
                  placeholder="What's happening?"
                  value={editContent}
                  onChange={(event) => setEditContent(event.target.value)}
                  required
                ></textarea>
                <hr />
                <div className={classes1.imageUpload}>
                  <label htmlFor="file-edit-input">
                    <i
                      className="fa-regular fa-image"
                      style={{ color: "blue", fontSize: "2rem" }}
                    ></i>
                    <img src={editImage} alt="" />
                  </label>
                  <input
                    id="file-edit-input"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0])
                        setEditImage(
                          URL.createObjectURL(event.target.files[0])
                        );
                    }}
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: "#1D9BF0" }}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default FeedDeatail;
