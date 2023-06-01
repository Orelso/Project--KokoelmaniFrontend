import React, { useState, useEffect } from "react";

interface Comment {
  id: number;
  text: string;
  username: string;
  image?: string;
  likes: number;
}

interface CommentBoxProps {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment, setComments }) => {
  const handleLike = () => {
    const updatedComment = { ...comment, likes: comment.likes + 1 }; // Create a new comment object with updated likes
    setComments((prevComments) => {
      const updatedComments = prevComments.map((prevComment) =>
        prevComment.id === comment.id ? updatedComment : prevComment
      );
      return updatedComments;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      {comment.image && (
        <div
          style={{
            marginBottom: "10px",
            overflow: "hidden", // Ensure images stay within the div
          }}
        >
          <img
            src={comment.image}
            alt="Comment"
            style={{
              width: "100%", // Fill the available width within the box
              height: "auto", // Maintain aspect ratio
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(comment.image, "_blank");
            }}
          />
        </div>
      )}
      <div>
        <strong>{comment.username}</strong>
        <p>{comment.text}</p>
        <button onClick={handleLike}>Likes: {comment.likes}</button>
      </div>
    </div>
  );
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [newCommentImage, setNewCommentImage] = useState<File | null>(null);
  const [showCommentSection, setShowCommentSection] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false); // State to control modal visibility

  // Load comments from localStorage on initial render
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to localStorage whenever comments state changes
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = () => {
    const newComment: Comment = {
      id: comments.length + 1,
      text: newCommentText,
      image: newCommentImage ? URL.createObjectURL(newCommentImage) : undefined,
      likes: 0,
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
    setNewCommentImage(null);
    setShowModal(false); // Close the modal after posting a comment
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
      setNewCommentImage(file);
    }
  };

  const handleToggleCommentSection = () => {
    setShowCommentSection(!showCommentSection);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
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
          width: "600%",
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
                  height: "auto",
                }}
              >
                <CommentBox comment={comment} setComments={setComments} />
              </div>
            ))
          )}
        </div>
      </div>
      {showModal ? ( // Display the modal when showModal state is true
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
              border: "2px solid black",
              borderRadius: "15px",
              padding: "20px",
              maxHeight: "500px",
              overflowY: "scroll",
              background: "white",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
              New Post
            </h2>
            {newCommentImage && (
              <img
                src={URL.createObjectURL(newCommentImage)}
                alt="New Comment"
                style={{ width: "100%", height: "auto", marginBottom: "10px" }}
              />
            )}
            <div>
              <p
                style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              ></p>
            </div>
            <textarea
              style={{
                width: "100%",
                marginBottom: "10px",
                border: "2px solid gray",
                wordWrap: "break-word",
                resize: "vertical",
                maxHeight: "200px",
                overflow: "auto",
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
            <button
              style={{ marginTop: "10px" }}
              onClick={handleAddComment}
              disabled={!newCommentText && !newCommentImage}
            >
              Post
            </button>
            <button style={{ marginTop: "10px" }} onClick={handleToggleModal}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "40%",
            marginLeft: "1px",
          }}
        >
          <button onClick={handleToggleModal}>Post</button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
