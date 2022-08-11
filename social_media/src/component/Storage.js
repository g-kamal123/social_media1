import React, { useEffect, useState } from "react";
import api from "../Postdata";
import {v4 as uuid} from 'uuid'
export const Storage = React.createContext();

export const Contxt = (props) => {
  const [postsData, setpostsData] = useState([]);
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
  const tweetHandler =async(content,image)=>{
//   console.log(image);
    const toAdd ={
        id:uuid(),
        author:"Kamal",
        content:content,
        image:image
    }
    const response = await api.post('/posts',toAdd)
    console.log(response.data)
    let arr = [response.data,...postsData]
    setpostsData(arr)
  }
//   console.log(postsData);
  return <Storage.Provider value={{postsData:postsData,tweetHandler:tweetHandler}}>{props.children}</Storage.Provider>;
};
