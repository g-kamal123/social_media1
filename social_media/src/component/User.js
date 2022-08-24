import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Storage } from './Storage'
import classes from './styles/Feeds.module.css'

function User() {
    const detail = useContext(Storage)
  return (
    <ul className={classes.feeds}>
        {!detail.srcharr.length && <h1 style={{minWidth:'35rem'}}>No tweet to Show</h1>}
      {detail.srcharr.map((item) => (
        <>
          <hr />
          <li>
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
              <Link to="/FeedDetails" state={{ feed: item }}>
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
  )
}

export default User