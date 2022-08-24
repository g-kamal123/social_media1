import React, { useEffect, useState } from "react";
import api from "../Postdata";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
export const Storage = React.createContext();

export const Contxt = (props) => {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [err1,seterr1] = useState("");
  const [err,setErr] = useState("")
  const [postsData, setpostsData] = useState([]);
  const [currPostComment, setCurrPostComment] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [srcharr, setSrcharr] = useState([]);
  const getPosts = async () => {
    const response = await api.get("/posts");
    return response.data;
  };
  useEffect(()=>{
    const getdata = async()=>{
      const response = await api.get('/curruser')
      setUser(response.data.user)
    }
    getdata()
    // const getarr = async()=>{
    //   const response = await api.get('/posts',{
    //     params:{
    //       author:user
    //     }
    //   })
    //   setSrcharr(response.data)
    // }
    // getarr()
  },[])
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
  }, []);
  console.log(allLikes);
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
  const addLike = async (val) => {
    // console.log(val.liked[user]);
    if (val.liked[user] === 1) {
      var toAdd = {
        id: val.id,
        image: val.image,
        content: val.content,
        author: val.author,
        liked: { ...val.liked, [user]: 0 },
      };
    } else
      toAdd = {
        id: val.id,
        image: val.image,
        content: val.content,
        author: val.author,
        liked: { ...val.liked, [user]: 1 },
      };
    const response = await api.put(`posts/${val.id}`, toAdd);
    const response2 = await api.get("/posts");
    setpostsData(response2.data);
    console.log(response.data);
  };
  const tweetHandler = async (content, image) => {
    //   console.log(image);
    const toAdd = {
      id: uuid(),
      author: "Kamal",
      content: content,
      image: image,
      liked: {},
    };
    const response = await api.post("/posts", toAdd);
    // console.log(response.data);
    let arr = [response.data, ...postsData];
    setpostsData(arr);
    nav("/");
  };
  //   console.log(postsData);

  const deletePost = async (val) => {
    const response = await api.delete(`/posts/${val}`);
    console.log(response);
    let arr = await getPosts();
    setpostsData(arr);
    nav("/");
  };
  const editPost = async (val) => {
    await api.put(`/posts/${val.id}`, val);
    let response = await api.get("/posts");
    setpostsData(response.data);
  };
  const delcomment = async (val) => {
    const response = await api.delete(`/comments/${val.id}`);
    const response1 = await api.get("/comments", {
      params: {
        postId: val.postId,
      },
    });
    setCurrPostComment(response1.data);
    // let arr = await
  };
  const searcharray = async (val) => {
    const response = await api.get(`/posts?q=${val.name}`);
    setSrcharr(response.data);
    // console.log(response.data)
  };
  const register = async (user, pass) => {
    const response1 = await api.get("/profile", {
      params: {
        name: user,
      },
    });
    // console.log(response.data)
    if (response1.data.length === 1) {
      setErr("user Name already exists")
      return;
    }
    const toAdd = {
      id: uuid(),
      name: user,
      pass: pass,
    };
    const response = await api.post("/profile", toAdd);
    setErr("")
    // setUser(user)
  };
  const aboutUser = async (user, pass) => {
    const response = await api.get("/profile", {
      params: {
        name: user,
        pass: pass,
      },
    });
    // console.log(response.data)
    const getdata =async()=>{
      await api.put('/curruser',{user:user})
    }
    if (response.data.length === 1) {
      getdata();
      setUser(user);
      seterr1("")
      nav("/feed");
    }
    else seterr1("username and password not matched")
  };
  const userprofile = async () => {
    console.log(user)
    const response = await api.get('/posts',{
      params:{
        author:user
      }
    });
    // console.log(response.data)
    setSrcharr(response.data);
    nav('/feed/User')
  };
  const logout = ()=>{
    setUser("")
    const getdata =async()=>{
      await api.put('/curruser',{user:""})
    }
    getdata();
    nav('/')
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
        deletePost: deletePost,
        editPost: editPost,
        delcomment: delcomment,
        addLike: addLike,
        searcharray: searcharray,
        srcharr: srcharr,
        aboutUser: aboutUser,
        register: register,
        user: user,
        userprofile: userprofile,
        err:err,
        logout:logout,
        err1:err1
      }}
    >
      {props.children}
    </Storage.Provider>
  );
};
