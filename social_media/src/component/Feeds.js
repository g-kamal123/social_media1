import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Storage } from './Storage'
import classes from './styles/Feeds.module.css'

function Feeds() {
  const detail = useContext(Storage)
  const likes =(val)=>{

  }
  return (
    <ul className={classes.feeds}>
      {detail.postsData.map((item)=>
      
      <>
      <hr />
      <li>
      <i className="fa-solid fa-circle-user"></i>
      <div className={classes.content}>
          <p className={classes.title}>
              <h4>{item.author}</h4>
              <span>@kamalnayanrai3.</span>
              <span>1h</span>
          </p>
          <p className={classes.textContent}>{item.content}</p>
          <img src={item.image} alt=''/>
      <hr />
          <p className={classes.action}>
          <Link to='/FeedDetails' state={{feed:item}}>
          <i className="fa-solid fa-comment" onClick={()=>detail.fetchComment(item)}></i>
          </Link>
          <i className="fa-solid fa-retweet"></i>
          <i className={`fa-solid fa-heart ${detail.allLikes.map((it)=>it.postId===item.id && classes.active)}`} onClick={()=>detail.addLike(item)}></i>
          </p>
      </div>
      </li></>)}
        
    </ul>
  )
}

export default Feeds