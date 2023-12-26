import { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3002/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {posts.map((post: any) => {
        return (
          <div
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
            key={post.id}
          >
            <div className="card-body">
              <h3>{post.title}</h3>
              {post.comments.map((comment: any) => {
                return (
                  <CommentList
                    postId={comment.id}
                    id={comment.id}
                    content={comment.content}
                    status={comment.status}
                  />
                );
              })}
              <CommentCreate postId={post.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
