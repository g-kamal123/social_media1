import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Storage } from './Storage'
import classes from './styles/Feeds.module.css'

function FeedDeatail() {
    const location = useLocation()
    const [reply,setReply] = useState('')
    const detail = useContext(Storage)
    const {feed} = location.state
  return (
    <ul className={classes.feeds}>
        <li>
      <i className="fa-solid fa-circle-user"></i>
      <div className={classes.content}>
          <p className={classes.title}>
              <h4>{feed.author}</h4>
              <span>@kamalnayanrai3.</span>
              <span>1h</span>
          </p>
          <p className={classes.textContent}>{feed.content}</p>
          <img src={feed.image} alt=''/>
      <hr />
          <p className={classes.action}>
          <i className="fa-solid fa-comment"></i>
          <i className="fa-solid fa-retweet"></i>
          <i className="fa-regular fa-heart"></i>
          </p>
      </div>
      </li>
      <li>
      <input onChange={(event)=>setReply(event.target.value)} value={reply}/>
      <i class="fa-solid fa-paper-plane" onClick={()=>detail.replyComment(reply,feed.id)}></i>
      </li>
      <ul>
        {detail.currPostComment.map((item)=>
        <li><span>{item.body}</span><span>{item.author}</span></li>)}
      </ul>
    </ul>
  )
}

export default FeedDeatail