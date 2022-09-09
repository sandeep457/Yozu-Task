import React, { useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import TagsInput from "./TagsInput";
import { Alert } from "react-bootstrap";
import '../Styles/Modal.css'

const baseURL = "https://yozu-task-default-rtdb.firebaseio.com/";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ModalData(props) {
  const { open, handleClose, posts } = props;
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [showAlert, setShowAlert] = useState(false);  
  const userEmail = localStorage.getItem('email');
  const childToParent = (childdata) => {
    setTags(childdata);
  }
  function checkTitle(element) {
    return (element.userEmail === userEmail && element.title === title);
  }
  function formatDate() {
    let date, month, year;
    const d = new Date();
    date = d.getDate();
    month = d.getMonth() + 1;
    year = d.getFullYear();
    date = date.toString().padStart(2, '0');
    month = month.toString().padStart(2, '0');
  return `${date}/${month}/${year}`;
  }
  function createPost(event) {
    event.preventDefault();
    if(posts.some(checkTitle)){
      alert('Unable to create post user with same title.')
    }else{
    axios.post(`${baseURL}/posts.json`, {
      "title": title,
      "post": post,
      "date": formatDate(),
      "tags": tags,
      "userEmail": userEmail
    })
      .then(() => {
        handleClose();
        setShowAlert(true);
      }, (error) => {
        console.log(error)
      });
    }
  }

  return (
      <div>
        {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>Your data posted successfully.</Alert>}
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                  <button onClick={handleClose} className="closeBtn">
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                  <Typography id="modal-modal-title" style={{ textAlign: "center" }}  variant="h6" component="h2">
                      Create a new Post
                  </Typography>
                  <form id="modal-modal-description" sx={{ mt: 2 }}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                      </FormControl>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <TextareaAutosize onChange={(e) => setPost(e.target.value)} aria-label="empty textarea" placeholder="Enter your post" id="outlined-basic" variant="outlined" minRows={6} style={{ width: "100%" ,border: "1px solid #ccc", paddingLeft: "5px"}}/>
                      </FormControl>
                      <FormControl fullWidth sx={{ m: 1 }}>
                      <Typography id="modal-modal-title" style={{ textAlign: "left" }}  variant="h6" component="h6">
                        Enter Some Tags
                      </Typography>
                        <TagsInput childToParent={childToParent} />
                      </FormControl>
                      <Box textAlign="center">
                        <Button variant="contained" disabled={title.length < 1 || post.length < 1 || tags.length < 1} onClick={createPost}>Submit</Button>
                      </Box>
                  </form>
              </Box>
          </Modal>
          <div></div>
      </div>
  );
}