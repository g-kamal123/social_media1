import React from "react";
import classes from "./styles/Trending.module.css";

function Trending() {
  return (
    <div className={classes.trending}>
      <div className={classes.search}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input placeholder="search" />
      </div>
      <div className={classes.trendingNames}>
        <h2>#Trending</h2>
        <ul>
          <li>
            <p>
              {" "}
              <h5>#Entertainment</h5>
              <span>1558 tweets</span>
            </p>
            <img src="https://images.wsj.net/im-597722?width=412" alt="" />
          </li>
          <li>
            <p>
              {" "}
              <h5>#Ukraine</h5>
              <span>1558 tweets</span>
            </p>

            <img src="https://images.wsj.net/im-597722?width=412" alt="" />
          </li>
          <li>
            <p>
              {" "}
              <h5>#Ukraine</h5>
              <span>1558 tweets</span>
            </p>
            <img src="https://images.wsj.net/im-597722?width=412" alt="" />
          </li>
          <li>
            <p>
              {" "}
              <h5>#Ukraine</h5>
              <span>1558 tweets</span>
            </p>
            <img src="https://images.wsj.net/im-597722?width=412" alt="" />
          </li>
        </ul>
      </div>
      <div className={classes.trendingNames}>
        <h2>Who to Follow?</h2>
        <ul>
          <li>
            <i
              className="fa-solid fa-circle-user"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5>Name</h5>
            <button>Follow</button>
          </li>
          <li>
            <i
              className="fa-solid fa-circle-user"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5>Name</h5>
            <button>Follow</button>
          </li>
          <li>
            <i
              className="fa-solid fa-circle-user"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5>Name</h5>
            <button>Follow</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Trending;
