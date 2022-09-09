import React from "react";
import { useUserAuth } from "../Context/UserAuthContext";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import ModalData from "./ModalData";
import TagsInput from "./TagsInput";
import '../Styles/Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faTags,
  faCalendar,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

const baseURL = "https://yozu-task-default-rtdb.firebaseio.com/";

export default function Dashboard(props) {
  const { logOut } = useUserAuth();
  const logOutHandler = () => {
    logOut();
  };
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    getPostsData();
  };
  let filteredPosts = [];
  const childToParent = (childdata) => {
    filterPost(childdata);
  };
  useEffect(() => {
    getPostsData();
  }, []);
  function getPostsData(){
    axios.get(`${baseURL}/posts.json`).then(
      (response) => {
        let data = Object.keys(response.data).map(
          (key) => response.data[key]
        );
        setPosts(data);
        setFinalData(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  function filterPost(childdata) {
    finalData.forEach(function (val) {
      val.tags.forEach(function (tag) {
        if (childdata.includes(tag)) {
          filteredPosts.push(val);
        }
      });
    });
    if (filteredPosts && filteredPosts.length > 0) {
      setPosts(filteredPosts);
    } else {
      filteredPosts.length === 0 && childdata.length > 0 ? setPosts([]) : setPosts(finalData);
    }
  }
  return (
    <>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid" style={{ display: "block" }}>
          <span className="navbar-brand"><a aria-label="Back to the Yozu homepage" href="https://yozu.co.uk">
            <svg xmlns="http://www.w3.org/2000/svg" width="101.299" height="35" viewBox="0 0 101.299 33"><g transform="translate(-1.38 -1.48)"><path d="M23.412,4.478a5.87,5.87,0,0,1-.521,1.891L15.706,24.949c-2.553,6.713-6.808,9.88-11.3,9.88a2.34,2.34,0,0,1,0-4.681c2.837,0,4.635-1.748,6.052-4.963L1.948,6.369a4.958,4.958,0,0,1-.568-1.8,2.694,2.694,0,0,1,2.7-2.694,2.742,2.742,0,0,1,2.553,1.75L12.864,18.9,18.159,4.052c.529-1.419,1.376-2.175,2.605-2.175a2.6,2.6,0,0,1,2.648,2.6Z" transform="translate(0 -0.35)" fill="#191a1a"></path><path d="M209.6,5a12.281,12.281,0,0,1,16.358,0,10.925,10.925,0,0,1,3.31,8.082,10.709,10.709,0,0,1-3.31,8.132,12.419,12.419,0,0,1-16.358,0,10.742,10.742,0,0,1-3.356-8.132A10.97,10.97,0,0,1,209.6,5Zm3.31,13.143a6.684,6.684,0,0,0,9.691,0,7.422,7.422,0,0,0,1.891-5.058A7.437,7.437,0,0,0,222.6,8.026a6.684,6.684,0,0,0-9.691,0,7.381,7.381,0,0,0-1.845,5.058A7.384,7.384,0,0,0,212.907,18.143Z" transform="translate(-180.511 -0.352)" fill="#191a1a"></path><path d="M429.66,22.751a2.132,2.132,0,0,1,2.032,2.127,2.066,2.066,0,0,1-2.032,2.127H415.193a1.891,1.891,0,0,1-2.08-1.891,3.148,3.148,0,0,1,.851-1.985L424.458,9.7h-9.691a2.079,2.079,0,0,1-2.08-2.119,2.13,2.13,0,0,1,2.08-2.08h14.372a1.9,1.9,0,0,1,2.032,1.891,3.009,3.009,0,0,1-.851,1.985L419.873,22.755Z" transform="translate(-362.421 -4.02)" fill="#191a1a"></path><path d="M599.25,3.892a2.436,2.436,0,0,1,4.87,0V13.913a6.918,6.918,0,0,0,.713,3.547c.757,1.37,2.27,2.316,4.681,2.316s3.922-.951,4.68-2.316a6.94,6.94,0,0,0,.756-3.547V3.892a2.412,2.412,0,0,1,4.823,0v10.4a9.935,9.935,0,0,1-1.7,6.192c-1.7,2.27-4.68,3.447-8.557,3.447-3.83,0-6.856-1.181-8.51-3.447a9.649,9.649,0,0,1-1.748-6.192Z" transform="translate(-526.81 0)" fill="#191a1a"></path><path d="M806.574,146.259a2.979,2.979,0,1,1,2.932-2.979A2.979,2.979,0,0,1,806.574,146.259Z" transform="translate(-706.828 -122.323)" fill="#cd092b"></path></g></svg>
            </a>
          </span>
          <button className="btn btn-info btn-md" style={{ float: "right" }} onClick={logOutHandler}>
            <FontAwesomeIcon icon={faSignOut} /> Logout
          </button>
        </div>
      </nav>
      <div className="container-fluid" style={{ marginTop: "70px" }}>
        <Button onClick={handleOpen} variant="contained" className="modalOpen">
        <FontAwesomeIcon icon={faEdit}/><span style={{paddingLeft:"5px"}}>Create a new post</span>
        </Button>
        <ModalData open={open} posts={posts} handleClose={handleClose}/>
        <div style={{ clear: "both" }}>
          <h1 className="text-center" style={{ color: "blueviolet" }}>
            POSTS
          </h1>
          <div>
          <FormControl sx={{ pl: 2.5,pr:2.5 }} fullWidth>
              <h5>Enter Tags to filter the posts</h5>
              <TagsInput childToParent={childToParent} />
          </FormControl>
          </div>
          <div className="row" style={{ marginBottom: "30px" }}>
           {posts.length>0 ? posts.map((post, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12" key={index}>
                <div className="cards">
                  <div className="title">{post.title}</div>
                  <div className="content">{post.post}</div>
                  <div className="d-flex justify-content-start align-items-center tags">
                    <FontAwesomeIcon icon={faTags} />
                    <span>Tags: {post.tags.toString()}</span>
                  </div>
                  <div className="d-flex justify-content-start align-items-center date">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>Date: {post.date}</span>
                  </div>
                </div> 
              </div>
            )): <h2 className="text-center" style={{ margin: "0 auto" ,paddingTop:"30px"}}>No posts available</h2>}
          </div>
        </div>
      </div>
    </>
  );
}