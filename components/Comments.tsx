import Image from "next/image";
import moment from "moment";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthUserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Comments({ roleID }) {
  const { authUser } = useAuth();
  const [trigger, setTrigger] = useState(0);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getComments() {
      try {
        const response = await axios.get(`/api/comments/getCommentsByRole`, {
          params: {
            id: roleID,
            parent_comment: -1,
          },
        });
        setComments([...response.data.comments]);
      } catch (error) {
        console.log("Error in getting comments. " + error);
      }
    }
    getComments();
  }, [trigger]);
  function parseText(comment_text) {
    const words = comment_text.split(" ");
    let results = [];
    for (let word of words) {
      if (word.includes("@")) {
        let r = word.replace(/@\w+/, "");
        let a = word.replace(r, "");
        results.push(<span className="text-blue-400">{a}</span>);
        results.push(r);
      } else {
        results.push(word);
      }
      results.push(" ");
    }
    return results;
  }
  function AddComment(e, parent) {
    if (e.key == "Enter") {
      const addComment = async () => {
        try {
          await axios.post("/api/comments/addComment", {
            author: authUser.username,
            content: e.target.value,
            role: roleID,
            parent_comment: parent,
          });
          e.target.value = "";
          setTrigger(trigger + 1);
        } catch (err) {
          toast("We couldn't add your comment!");
        }
      };
      addComment();
    }
  }
  function getCommentBlock(comment) {
    console.log(comment);
    return (
      <div className="flex flex-col mt-4 p-2 max-h-100 bg-gray-50 rounded-lg">
        <div className="flex flex-row space-x-4 mb-4">
          <div className="flex flex-row flex-grow space-x-4 my-auto">
            <div>
              <a href="#" className="text-blue-400">
                {comment.author_object.username}
              </a>
            </div>
            <div>
              <p className="text-gray-300">
                {moment.parseZone(comment.created_time).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-shrink">
            <p>{comment.content}</p>
          </div>
        </div>
      </div>
    );
  }
  function createCommentStructure(comments_input) {
    return comments_input.map((comment, index) => {
      return (
        <div key={index} className="bg-light-grey my-4 rounded-lg">
          <div className="flex flex-col mt-4 p-2 max-h-100 bg-gray-50 rounded-lg ml-12">
            <div className="flex flex-row space-x-4 mb-2">
              <div className="flex flex-row flex-grow space-x-4 my-auto">
                <div>
                  <a href="#" className="text-blue-400">
                    {comment.author_object.username}
                  </a>
                </div>
                <div>
                  <p className="text-gray-300">
                    {moment.parseZone(comment.created_time).fromNow()}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-shrink">
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
          <input
            type="text"
            onKeyPress={(e) => {
              AddComment(e, comment.id);
            }}
            placeholder="Write a reply"
            className="rounded-lg w-11/12 border-gray-400 border-0 placeholder:text-gray-500 ml-12 text-sm mb-4 bg-gray-100"
          ></input>
          {comment.replies_object.length > 0 && (
            <div className="mb-4">
              <hr className="w-11/12 mx-auto"></hr>
              <p className="mt-2 mx-14 font-bold text-base">
                {comment.replies_object.length} Answers
              </p>
              {comment.replies_object.map((reply, key) => {
                return (
                <div key={key} className="ml-16">
                  <div className="flex flex-col p-2 max-h-100 bg-gray-50 rounded-lg">
                    <div className="flex flex-row space-x-4 mb-2">
                      <div className="flex flex-row flex-grow space-x-4 my-auto">
                        <div>
                          <a href="#" className="text-blue-400">
                            {reply.author_object.username}
                          </a>
                        </div>
                        <div>
                          <p className="text-gray-300">
                            {moment.parseZone(reply.created_time).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-shrink">
                        <p>{reply.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          )}
        </div>
      );
    });
  }
  function isAuthenticated() {
    return (
      <div className="flex flex-col mb-4">
        <div className="flex flex-row flex-grow space-x-8 mb-2">
          <div className="flex flex-grow">
            <input
              type="text"
              className="rounded-lg full-input border-gray-400 border-0.5 placeholder:text-gray-500
              no-outline text-sm"
              onKeyPress={(e) => {
                AddComment(e, -1);
              }} // use -1 to indicate root comments
              placeholder="Ask a question"
            ></input>
          </div>
        </div>
        {comments.length == 0 && (
          <div className="flex items-center flex-grow bg-light-grey rounded-lg shadow py-24">
            <div className="mx-auto my-auto">
              <img src="/NoComments.svg"></img>
            </div>
          </div>
        )}
        <div className="flex flex-col">
          {comments.length > 0 && createCommentStructure(comments)}
        </div>
        <div>
          <ToastContainer
            toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
          />
        </div>
      </div>
    );
  }
  if (authUser) {
    return isAuthenticated();
  } else {
    return (
      <div className="flex flex-col shadow bg-gray-50 mt-2">
        <div className="m-auto mt-10">
          <img src="/loginNeededIcon.svg"></img>
        </div>
        <div className="m-auto my-8">
          <p className="text-lg">
            Please <span className="text-blue-400">login</span> or{" "}
            <span className="text-blue-400">sign up</span> to add a comment
          </p>
        </div>
      </div>
    );
  }
}
