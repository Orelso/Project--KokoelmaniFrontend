import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
  username: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");

  const handleAddComment = () => {
    const newComment: Comment = {
      id: comments.length + 1,
      text: newCommentText,
      username: "exampleUsername",
    };
    setComments([newComment, ...comments]); // new comments go to the top
    setNewCommentText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "15px", // Modify the value to adjust the roundness
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        width: "25%",
        margin: "0 auto",
        height: "100%",
        float: "right",
        marginRight: "1px",
      }}
    >
      <h2
        style={{
          borderBottom: "1px solid black",
          width: "100%",
          textAlign: "center",
          marginBottom: "2px",
        }}
      >
        Comments 💬
      </h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.username}: </strong>
              {comment.text}
            </li>
          ))}
        </ul>
      )}
      <div style={{ flex: 1 }} />
      <textarea
        style={{
          width: "100%",
          marginBottom: "10px",
          border: "2px solid gray",
        }}
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button style={{ marginTop: "10px" }} onClick={handleAddComment}>
        Post
      </button>
    </div>
  );
};

export default CommentSection;
