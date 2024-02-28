import React, { useEffect, useState } from "react";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import Menu from "../components/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style.scss";
import client, { headers } from "./axios-config";
import Cookies from "js-cookie";
import moment from "moment";

function createHeaders() {
  const token = Cookies.get("csrftoken");
  return {
    "X-CSRFToken": token,
    "Content-Type": "application/json",
  };
}

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
        setPost(res.data);
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
        <img
          src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
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
        <h1>{post.title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          assumenda voluptas molestiae a exercitationem nisi quae consequuntur
          dolorem ullam aut ex sint perferendis repellat corrupti amet,
          cupiditate fugiat cumque tempora.
          <br />
          <br />
          Blanditiis esse amet beatae debitis iusto cum cumque voluptatum quo
          eos impedit. Facilis tempora perferendis illo fugiat laborum. Enim
          fuga voluptas neque, dicta aliquam nostrum cumque aliquid reiciendis
          quibusdam minima?
          <br />
          <br />
          Porro rerum dicta accusamus alias nemo necessitatibus at quibusdam,
          eaque labore asperiores est obcaecati expedita, id aliquam sint ut
          quam facere et laborum repellat eveniet unde esse exercitationem.
          Eligendi, quod.
        </p>

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
