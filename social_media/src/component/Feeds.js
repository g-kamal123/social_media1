import React, { useContext } from 'react'
import { Storage } from './Storage'
import classes from './styles/Feeds.module.css'

function Feeds() {
  const detail = useContext(Storage)
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
          <i className="fa-solid fa-comment"></i>
          <i className="fa-solid fa-retweet"></i>
          <i className="fa-regular fa-heart"></i>
          </p>
      </div>
      </li></>)}
        
    </ul>
  )
}

export default Feeds