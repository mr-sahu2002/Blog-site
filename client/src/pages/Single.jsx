import React, { useEffect, useState } from "react";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import Menu from "../components/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/style.scss";
import client, { createHeaders } from "../axios-config";
import moment from "moment";

// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import ImageResize from "quill-image-resize-module-react";

function Single() {
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    client
      .get("/api/user")
      .then(function (res) {
        setCurrentUser(res.data.user.username);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.get(`api/posts/${postId}`);
        const postData = res.data;
        const imageId = postData.images;

        if (imageId) {
          // Fetch image URL based on image_id
          const imageRes = await client.get(`/api/get_image_url/${imageId}`);
          const imageUrl = imageRes.data.url;
          // Add imageUrl to postData
          postData.images = imageUrl;
        }

        setPost(postData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      if (post.author === currentUser) {
        await client.delete(`api/posts/${postId}`, {
          headers: createHeaders(),
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setComment("");
  };
  const handleSubmit = () => {};

  return (
    <div className="single">
      <div className="content">
        <img src={`http://127.0.0.1:8000${post.images}`} alt="" />
        <div className="user">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYxsG3Ac8-CCLG3PzEvZXAfVoQxmjHleJqjg&usqp=CAU"
            alt=""
          />
          <div className="info">
            <span>{post.author}</span>
            <p>{moment(post.created_at).fromNow()}</p>
          </div>

          <div className="edit">
            {post.author === currentUser ? (
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="Edit" />
              </Link>
            ) : null}

            {post.author === currentUser ? (
              <img onClick={handleDelete} src={Delete} alt="Delete" />
            ) : null}
          </div>
        </div>
        <div className="post-title">
          <h1>{post.title}</h1>
        </div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {/* <ReactQuill value={post.content} readOnly={true} theme={"bubble"} /> */}

        <div className="comment-area">
          <input
            className="comment-inp"
            type="textarea"
            placeholder="leave a comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></input>
          <button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <Menu />
    </div>
  );
}

export default Single;
