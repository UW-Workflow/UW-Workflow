import Image from "next/image";
import moment from "moment";
import { useState } from "react";

const TIMESTAMP_FORMAT = "YYYY-MM-DD:hh:mm";

export default function Comments() {
  const is_authenticated = false; // should be global state variable
  const [comments, setComments] = useState([
    // {
    //   id: 1,
    //   author_name: "Tony",
    //   author_picture: "",
    //   time_passed: "2021-12-10:19:20",
    //   text: "Lorem ipsum dolor sit @amet, consectetur adipiscing elit. Donec id nunc at magna placerat faucibus nec quis dolor. Morbi ultricies consectetur justo, ut lacinia dolor rhoncus nec. Proin in enim in erat commodo semper. Integer ac posuere augue, eu ultricies enim. Morbi dignissim mauris vel nibh ultricies, vel aliquet augue varius. Aliquam ullamcorper blandit diam sed laoreet. Donec aliquam, erat et dapibus accumsan, lectus augue pulvinar odio, gravida hendrerit lorem nibh vel mauris. Integer rhoncus felis enim, dictum efficitur ipsum tristique eget. Donec tortor ipsum, convallis ac mollis ut, convallis sed ligula. Duis sodales, sapien vitae aliquam tempus, mi sapien rutrum diam, imperdiet ullamcorper dui orci at metus. Mauris augue leo, consequat in ligula sed, tincidunt tincidunt metus. Praesent dapibus imperdiet eleifend. Fusce sed augue nec turpis porttitor volutpat. Donec et magna velit. Sed fringilla mi vel lacus ullamcorper, sit amet tristique ante pulvinar. Mauris sit amet dolor leo.",
    // },
    // {
    //   id: 1,
    //   author_name: "Tony",
    //   author_picture: "",
    //   time_passed: "2021-12-10:19:20",
    //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nunc at magna placerat faucibus nec quis dolor. Morbi ultricies consectetur justo, ut lacinia dolor rhoncus nec. Proin in enim in erat commodo semper. Integer ac posuere augue, eu ultricies enim. Morbi dignissim mauris vel nibh ultricies, vel aliquet augue varius. Aliquam ullamcorper blandit diam sed laoreet. Donec aliquam, erat et dapibus accumsan, lectus augue pulvinar odio, gravida hendrerit lorem nibh vel mauris. Integer rhoncus felis enim, dictum efficitur ipsum tristique eget. Donec tortor ipsum, convallis ac mollis ut, convallis sed ligula. Duis sodales, sapien vitae aliquam tempus, mi sapien rutrum diam, imperdiet ullamcorper dui orci at metus. Mauris augue leo, consequat in ligula sed, tincidunt tincidunt metus. Praesent dapibus imperdiet eleifend. Fusce sed augue nec turpis porttitor volutpat. Donec et magna velit. Sed fringilla mi vel lacus ullamcorper, sit amet tristique ante pulvinar. Mauris sit amet dolor leo.",
    // },
    // {
    //   id: 2,
    //   author_name: "Tony",
    //   author_picture: "",
    //   time_passed: "2021-12-10:19:20",
    //   text: "this is a comment",
    // },
    // {
    //   id: 3,
    //   author_name: "Tony",
    //   author_picture: "",
    //   time_passed: "2021-12-10:19:20",
    //   text: "this is a @comment",
    // },
  ]);
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
      setComments([
        {
          id: -1,
          author_name: "Tony",
          author_picture: "",
          time_passed: "2021-12-10:19:20",
          text: e.target.value,
        },
        ...comments,
      ]);
      e.target.value = "";
    }
  }
  function isAuthenticated() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row flex-grow space-x-8 mb-6">
          <div>
            <img src="default_profile.jpg"></img>
          </div>
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
              <img src="NoComments.svg"></img>
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
                    <div>
                      {comment.author_picture == "" && (
                        <img
                          src="default_profile.jpg"
                          className="rounded-full"
                        ></img>
                      )}
                      {comment.author_picture != "" && (
                        <img
                          src={comment.author_picture}
                          className="rounded-full"
                        ></img>
                      )}
                    </div>
                    <div className="flex flex-row flex-grow space-x-4 my-auto">
                      <div>
                        <a href="#" className="text-blue-400">
                          {comment.author_name}
                        </a>
                      </div>
                      <div>
                        <p className="text-gray-300">
                          {moment(
                            comment.time_passed,
                            TIMESTAMP_FORMAT
                          ).fromNow()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse flex-grow my-auto">
                      <div>
                        <img src="More.svg"></img>
                      </div>
                      <div>
                        <img src="Reply.svg"></img>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-shrink">
                      {/* <p>{comment.text}</p> */}
                      <p>{parseText(comment.text)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  if (is_authenticated) {
    return isAuthenticated();
  } else {
    return (
      <div className="flex flex-col shadow bg-gray-50 mt-2">
        <div className="m-auto mt-10">
          <img src="loginNeededIcon.svg"></img>
        </div>
        <div className="m-auto my-8">
          <p className="text-lg">Please <span className="text-blue-400">login</span> or <span className="text-blue-400">sign up</span> to add a comment</p>
        </div>
      </div>
    );
  }
}
