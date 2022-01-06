import Image from "next/image";
import moment from "moment";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthUserContext";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
export default function Comments({ roleID }) {
  const { authUser } = useAuth();
  const [trigger,setTrigger] = useState(0);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getComments() {
      try {
        const response = await axios.get(`/api/comments/getCommentsByRole`, {
          params: {
            id: roleID,
          },
        });
        setComments([...response.data.comments]);
      } catch (error) {
        console.log("Error in getting company for the role page. " + error);
      }
    }
    getComments();
  },[trigger]);
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
  function AddComment(e) {
    if (e.key == "Enter") {
      const addComment = async () => {
        try {
          await axios.post("/api/comments/addComment", {
            author : authUser.username,
            content: e.target.value,
            role: roleID
          });
          e.target.value = "";
          setTrigger(trigger + 1);
        } catch (err) {
          // TODO: handle error
        }
      };
      addComment()
    }
  }
  function isAuthenticated() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row flex-grow space-x-8 mb-6">
          <div className="flex flex-grow">
            <input
              type="text"
              className="rounded-lg full-input border-gray-400 border-0.5 placeholder:text-gray-500
              focus:outline-none"
              onKeyPress={AddComment}
              placeholder="Add your comment here"
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
        <div className="flex flex-col overflow-auto max-h-90">
          {comments.length > 0 &&
            comments.map((comment, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col my-4 p-2 max-h-100 bg-gray-50 rounded-lg"
                >
                  <div className="flex flex-row space-x-4 mb-4">
                    <div className="flex flex-row flex-grow space-x-4 my-auto">
                      <div>
                        <a href="#" className="text-blue-400">
                          {comment.author_object.username}
                        </a>
                      </div>
                      <div>
                        <p className="text-gray-300">
                          {moment.parseZone(
                            comment.created_time
                          ).fromNow()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse flex-grow my-auto">
                      <div>
                        <img src="/More.svg"></img>
                      </div>
                      <div>
                        <img src="/Reply.svg"></img>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-shrink">
                      <p>{parseText(comment.content)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
