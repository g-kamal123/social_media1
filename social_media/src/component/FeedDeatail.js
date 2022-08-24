import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Storage } from "./Storage";
import classes from "./styles/Feeds.module.css";
import { Modal } from "@mui/material";
import classes1 from "./styles/Social.module.css";
import styl from './styles/FeedDetail.module.css'
import api from "../Postdata";

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
  const [flag,setFlag] = useState(false)
  useEffect(()=>{
    const getdata = async()=>{
      const response = await api.get(`/posts/${print.id}`)
      setPrint(response.data)
    }
    getdata()
  },[flag])
 
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
              <i className="fa-solid fa-comment" onClick={()=>detail.fetchComment(print.id)}></i>
              <i className="fa-solid fa-retweet"></i>
              <i
                  className={`fa-solid fa-heart ${print.liked[detail.user]===1 && classes.active
                  }`}
                  onClick={() => {
                    detail.addLike(print)
                  setFlag(!flag)}}
                ></i>
            </p>
          </div>
        </li>
        <li>
          <div className={styl.inputcomm}>
          <input
            onChange={(event) => setReply(event.target.value)}
            value={reply} placeholder='comments...'
          />
          <i
            class="fa-solid fa-paper-plane"
            onClick={() => {
              setReply('')
              detail.replyComment(reply, feed.id)}}
          ></i>
          </div>
        </li>
        <ul className={styl.comments}>
          {detail.currPostComment.map((item) => (
            <li>
              <i className="fa-solid fa-circle-user"></i>
            <p>
          <span>{item.author}</span>
          <p>{item.body}</p>
          <hr />
          </p>
              <button onClick={()=>detail.delcomment(item)}>delete</button>
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
                    id:print.id,image:editImage,content:editContent,author:print.author,liked:{...print.liked}
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
