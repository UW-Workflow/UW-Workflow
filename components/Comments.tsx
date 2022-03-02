import Image from "next/image";
import moment from "moment";
import * as blockies from "blockies-ts";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthUserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { ROUTES } from "../constants/routes";
import "react-toastify/dist/ReactToastify.css";
export default function Comments({ roleID }) {
  const { authUser } = useAuth();
  const router = useRouter();
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
  function AddComment(e) {
    if (e.current.value == "") {
      return;
    }
    const addComment = async () => {
      try {
        await axios.post("/api/comments/addComment", {
          author: authUser.username,
          content: e.current.value,
          role: roleID,
          parent_comment: -1,
        });
        setTrigger(trigger + 1);
      } catch (err) {
        toast("We couldn't add your comment!");
      }
    };
    addComment();
    e.current.value = "";
  }
  function AddReply(e, parent) {
    if (e.key == "Enter") {
      if (e.target.value == "") {
        return;
      }
      const addReply = async () => {
        try {
          await axios.post("/api/comments/addComment", {
            author: authUser.username,
            content: e.target.value,
            role: roleID,
            parent_comment: parent,
          });
          setTrigger(trigger + 1);
        } catch (err) {
          toast("We couldn't add your comment!");
        }
      };
      addReply();
      e.target.value = "";
    }
  }
  function createCommentStructure(comments_input) {
    return comments_input.map((comment, index) => {
      return (
        <div key={index} className="bg-light-grey my-4 rounded-lg">
          <div className="flex flex-col mt-4 p-2 max-h-100 bg-gray-50 rounded-lg mx-5 sm:ml-4">
            <div className="flex flex-row space-x-4 mb-2">
              <div className="flex flex-row flex-grow space-x-4 my-auto">
                <div className="flex flex-row">
                  <img
                    src={blockies
                      .create({ seed: comment.author_object.username })
                      .toDataURL()}
                    className="rounded-xl mr-2"
                  />
                  <a href="#" className="text-blue-400  self-center">
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
          {authUser && (
            <input
              type="text"
              onKeyPress={(e) => {
                AddReply(e, comment.id);
              }}
              placeholder="Write a reply"
              className="rounded-lg w-5/6 sm:w-11/12 border-gray-400 border-0 placeholder:text-gray-500 mx-5  sm:ml-4 text-sm mb-4 bg-gray-100"
            ></input>
          )}
          {authUser && <div className="py-3 mb-4"></div>}
          {comment.replies_object.length > 0 && (
            <div className="mb-4">
              <hr className="w-11/12 mx-auto"></hr>
              <p className="mt-2 mx-14 font-bold text-base">
                {comment.replies_object.length} Answers
              </p>
              <div className="border-l-2 ml-10">
                {comment.replies_object.map((reply, key) => {
                  return (
                    <div key={key} className="ml-4">
                      <div className="flex flex-col p-2 max-h-100 bg-gray-50 rounded-lg">
                        <div className="flex flex-row space-x-4 mb-2">
                          <div className="flex flex-row flex-grow space-x-4 my-auto">
                            <div className="flex flex-row">
                              <img
                                src={blockies
                                  .create({
                                    seed: reply.author_object.username,
                                  })
                                  .toDataURL()}
                                className="rounded-xl mr-2"
                              />
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
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    });
  }
  function IsAuthenticated() {
    const questionInput = useRef(null);
    return (
      <div className="flex flex-col mb-4">
        {authUser && (
          <div className="flex flex-row flex-grow space-x-8 mb-2">
            <div className="flex flex-row flex-grow">
              <img
                src={blockies.create({ seed: authUser.username }).toDataURL()}
                className="rounded-xl mr-2 my-auto"
              />
              <input
                type="text"
                style={{ width: "95%" }}
                className="rounded-lg border-gray-400 border-0.5 placeholder:text-gray-500
                no-outline text-sm"
                placeholder="Ask a question"
                ref={questionInput}
              ></input>
              <div
                onClick={() => {
                  AddComment(questionInput);
                }} // use -1 to indicate root comments
                style={{ cursor: "pointer" }}
                className="font-bold text-button-blue px-7 flex items-center space-x-2 ml-7 border-2 rounded-full border-button-blue"
              >
                Submit
              </div>
            </div>
          </div>
        )}
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
  return IsAuthenticated();
}
