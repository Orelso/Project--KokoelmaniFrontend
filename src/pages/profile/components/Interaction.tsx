import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
  username: string;
  image?: string;
}

interface CommentBoxProps {
  comment: Comment;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      {comment.image && (
        <div>
          <img
            src={comment.image}
            alt="Comment"
            style={{
              width: "100px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(comment.image, "_blank");
            }}
          />
          <img
            src={comment.image}
            alt="Comment"
            style={{
              width: "200px",
              height: "auto",
              display: "none",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
            onClick={() => {
              window.open(comment.image, "_blank");
            }}
            id={`comment-image-${comment.id}`}
          />
        </div>
      )}
      <div>
        <strong>{comment.username}</strong>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [newCommentImage, setNewCommentImage] = useState<string>("");

  const handleAddComment = () => {
    const newComment: Comment = {
      id: comments.length + 1,
      text: newCommentText,
      username: "Timmy1856",
      image: newCommentImage,
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
    setNewCommentImage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAddComment();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNewCommentImage(e.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          border: "2px solid black",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          width: "60%",
          marginRight: "1px",
        }}
      >
        <h2
          style={{
            borderBottom: "1px solid black",
            width: "100%",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Posts
        </h2>
        <div
          style={{
            overflowY: "scroll",
            maxHeight: "400px",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          {comments.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  border: "2px solid black",
                  borderRadius: "15px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <CommentBox comment={comment} />
              </div>
            ))
          )}
        </div>
        <textarea
          style={{
            width: "100%",
            marginBottom: "10px",
            border: "2px solid gray",
          }}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your comment..."
        />
        <label style={{ marginBottom: "10px" }}>
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
        <button style={{ marginTop: "10px" }} onClick={handleAddComment}>
          Post
        </button>
      </div>
      {newCommentImage && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            width: "40%",
            border: "2px solid black",
            borderRadius: "15px",
            marginLeft: "1px",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            New Comment
          </h2>
          <img
            src={newCommentImage}
            alt="New Comment"
            style={{ width: "100px", marginBottom: "10px" }}
          />
          <div>
            <strong>Timmy1856</strong>
            <p>{newCommentText}</p>
          </div>
          <button
            style={{ marginTop: "10px" }}
            onClick={() => {
              setNewCommentImage("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
