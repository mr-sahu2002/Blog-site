import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import client from "./axios-config";
import Cookies from "js-cookie";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

function createHeaders() {
  const token = Cookies.get("csrftoken");
  return {
    "X-CSRFToken": token,
    "Content-Type": "application/json",
  };
}

Quill.register("modules/imageResize", ImageResize);

function Write() {
  const [currentUser, setCurrentUser] = useState();
  const state = useLocation().state;
  const [username, setUsername] = useState("");
  const [value, setValue] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  useEffect(() => {
    client
      .get("/api/user")
      .then(function (res) {
        setUsername(res.data.user.user_id);
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
        navigate("/login");
      });
  }, []);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await client.post("api/upload", formData, {
        headers: createHeaders(),
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const post = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await client.put(
            `/api/create/${state.post_id}`,
            {
              author: username,
              title,
              content: value,
              cat,
              images: file ? imgUrl.image_id : "",
            },
            { headers: createHeaders() }
          )
        : await client.post(
            `/api/create`,
            {
              author: username,
              title: title,
              content: value,
              cat: cat,
              images: file ? imgUrl : "",
            },
            { headers: createHeaders() }
          );
      navigate("/");
    } catch (error) {
      console.log(file);
      console.log(imgUrl);
      console.log(error);
    }
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: 1 }, { header: 2 }],
      ["blockquote", "code-block", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }],
      [{ font: ["Times-New-Ro"] }],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  if (currentUser) {
    return (
      <div className="add">
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer" style={{ height: "400px" }}>
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
            />
          </div>
        </div>

        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>

            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>

            <div className="buttons">
              <button>Save as a draft</button>
              &nbsp;&nbsp;
              <button onClick={post}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "art"}
                name="cat"
                value="art"
                id="art"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "science"}
                name="cat"
                value="science"
                id="science"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "technology"}
                name="cat"
                value="technology"
                id="technology"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "travel"}
                name="cat"
                value="travel"
                id="travel"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="travel">Travel</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "event"}
                name="cat"
                value="event"
                id="event"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="event">Event</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "food"}
                name="cat"
                value="food"
                id="food"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Write;
