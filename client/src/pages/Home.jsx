import React from "react";
import { useEffect, useState } from "react";
import client from "./axios-config";
import "../style.scss";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.get(`api/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.post_id}>
            <div className="img">
              {/* <img src={`${post.img}`} alt="" /> */}
              <img
                src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.post_id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.content).slice(0, 200) + "..."}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
