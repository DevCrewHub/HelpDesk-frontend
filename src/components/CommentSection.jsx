import { useEffect, useRef, useState } from "react";
import api from "../utils/api";
import { MessageCircle } from "lucide-react";

const CommentSection = ({ ticketId, ticket }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const scrollRef = useRef(null);

  const currentUserId = parseInt(localStorage.getItem("userId"));
  const currentUserName = localStorage.getItem("userName");

  const isCustomer = currentUserId === ticket?.customerId;
  const isAssignedAgent = currentUserId === ticket?.agentId;
  const canComment = isCustomer || isAssignedAgent;

  useEffect(() => {
    if (ticketId) fetchComments();
  }, [ticketId]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${ticketId}`);
      setComments(res.data);
      scrollToBottom();
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await api.post("/comments", {
        body: newComment,
        ticketId: parseInt(ticketId),
      });
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="mt-8">
      <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-indigo-500" /> Comments
      </h3>

      <div className="space-y-4 max-h-72 overflow-y-auto bg-gradient-to-b from-gray-50 to-white border border-gray-300 rounded-xl p-4 shadow-md">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-400 p-6">
            <svg
              className="w-10 h-10 mb-2 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h5m-5 4h10M4 6h16a2 2 0 012 2v12a2 2 0 01-2 2H6l-4 4V8a2 2 0 012-2z"
              />
            </svg>
            <p className="text-sm">No messages yet. Be the first to start!</p>
          </div>
        ) : (
          comments.map((comment, index) => {
            const isMe = comment.userId === currentUserId;
            const isCommentCustomer = comment.userId === ticket?.customerId;
            const isCommentAgent = comment.userId === ticket?.agentId;

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm break-words whitespace-pre-wrap shadow-md transition-all duration-300 ${
                    isMe ? "bg-indigo-500 text-white rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <div className="text-xs font-semibold mb-1 flex items-center gap-2">
                    {comment.postedBy}
                    {isCommentCustomer && (
                      <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-[10px]">
                        Customer
                      </span>
                    )}
                    {isCommentAgent && (
                      <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-[10px]">
                        Agent
                      </span>
                    )}
                  </div>
                  <div>{comment.body}</div>
                  <div
                    className={`text-[11px] mt-2 text-right font-medium ${
                      isMe ? "text-white/70" : "text-gray-600"
                    }`}
                  >
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={scrollRef} />
      </div>

      {canComment ? (
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 bg-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm"
          />
          <button
            onClick={handleAddComment}
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow cursor-pointer"
          >
            Send
          </button>
        </div>
      ) : (
        <div className="mt-4 text-gray-500 text-sm italic">
          Only the assigned agent and the ticket creator can post messages.
        </div>
      )}
    </div>
  );
};

export default CommentSection;
