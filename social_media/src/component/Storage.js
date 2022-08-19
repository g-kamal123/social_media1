import React, { useEffect, useState } from "react";
import api from "../Postdata";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
export const Storage = React.createContext();

export const Contxt = (props) => {
const nav = useNavigate()
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
    // console.log(response.data);
    let arr = [response.data, ...postsData];
    setpostsData(arr);
    nav('/')
  };
  //   console.log(postsData);

  const deletePost =async(val)=>{
    const response = await api.delete(`/posts/${val}`)
    console.log(response)
    let arr = await getPosts()
    setpostsData(arr)
    nav('/')
  }
  const editPost = async(val)=>{
    await api.put(`/posts/${val.id}`,val)
    let response = await api.get('/posts')
    setpostsData(response.data)
  }
  return (
    <Storage.Provider
      value={{
        postsData: postsData,
        tweetHandler: tweetHandler,
        fetchComment: fetchComment,
        currPostComment: currPostComment,
        replyComment: replyComment,
        allLikes: allLikes,
        deletePost:deletePost,
        editPost:editPost
      }}
    >
      {props.children}
    </Storage.Provider>
  );
};
