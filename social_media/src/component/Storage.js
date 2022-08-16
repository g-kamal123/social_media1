import React, { useEffect, useState } from "react";
import api from "../Postdata";
import { v4 as uuid } from "uuid";
export const Storage = React.createContext();

export const Contxt = (props) => {
  const [postsData, setpostsData] = useState([]);
  const [currPostComment, setCurrPostComment] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const getPosts = async () => {
    const response = await api.get("/posts");
    return response.data;
  };
  useEffect(() => {
    const allPosts = async () => {
      const posts = await getPosts();
      setpostsData(posts);
    };
    allPosts();
  }, []);
  useEffect(() => {
    const getLikes = async () => {
      const response = await api.get("/likes", {
        params: {
          author: "kamal",
        },
      });
      setAllLikes(response.data);
    };
    getLikes();
  },[]);
  console.log(allLikes)
  const fetchComment = async (val) => {
    // console.log(val)
    const response = await api.get("/comments", {
      params: {
        postId: val.id,
      },
    });
    setCurrPostComment(response.data);
    // console.log(response.data)
  };
  const replyComment = async (val, id) => {
    const toAdd = {
      id: uuid(),
      author: "kamal",
      body: val,
      postId: id,
    };
    const response = await api.post("/comments", toAdd);
    setCurrPostComment([response.data, ...currPostComment]);

    // const arr = postsData.filter((item)=>item.id===id)
    // arr.comments += 1
    // let arr1 = postsData.filter((item)=>item.id!==id)
    // arr1 = [arr,...arr1]
    // setpostsData(arr1)
  };
  const addLike = (val) => {};
  const tweetHandler = async (content, image) => {
    //   console.log(image);
    const toAdd = {
      id: uuid(),
      author: "Kamal",
      content: content,
      image: image,
    };
    const response = await api.post("/posts", toAdd);
    console.log(response.data);
    let arr = [response.data, ...postsData];
    setpostsData(arr);
  };
  //   console.log(postsData);
  return (
    <Storage.Provider
      value={{
        postsData: postsData,
        tweetHandler: tweetHandler,
        fetchComment: fetchComment,
        currPostComment: currPostComment,
        replyComment: replyComment,
        allLikes: allLikes,
      }}
    >
      {props.children}
    </Storage.Provider>
  );
};
