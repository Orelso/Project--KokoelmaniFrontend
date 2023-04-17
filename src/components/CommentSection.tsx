import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");

  const handleAddComment = () => {
    const newComment: Comment = {
      id: comments.length + 1,
      text: newCommentText,
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
  };

  return (
    <div
      style={{
        border: "solid 5px hsla(0, 95%, 35%, 1)",
        borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",

        borderColor: "linear-gradient(to right, #fc5c7d, #6a82fb)",
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
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      )}
      <textarea
        style={{ width: "100%", marginBottom: "10px" }}
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
      />
      <button style={{ marginTop: "10px" }} onClick={handleAddComment}>
        Add Comment
      </button>
    </div>
  );
};

export default CommentSection;
