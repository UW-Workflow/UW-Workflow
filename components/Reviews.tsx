import { useState } from "react";
export default function Reviews() {
  const [Reviews, setReviews] = useState([
    {
      review_title: "Great Experience!",
      reviewed_date: "3 days ago",
      interview_experience: 3, // out of 5,
      coop_experience: 5, // out of 5
    },
    {
      review_title: "Great Experience!",
      reviewed_date: "3 days ago",
      interview_experience: 3, // out of 5,
      coop_experience: 5, // out of 5
    },
    {
      review_title: "Great Experience!",
      reviewed_date: "3 days ago",
      interview_experience: 3, // out of 5,
      coop_experience: 5, // out of 5
    },
    {
      review_title: "Great Experience!",
      reviewed_date: "3 days ago",
      interview_experience: 3, // out of 5,
      coop_experience: 5, // out of 5
    },
    {
      review_title: "Great Experience!",
      reviewed_date: "3 days ago",
      interview_experience: 3, // out of 5,
      coop_experience: 5, // out of 5
    },
  ]);
  function setStars(num) {
    const TOTAL_STARS = 5;
    var stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(
        <div>
          <img src="star.svg"></img>
        </div>
      );
    }
    for (let i = 0; i < TOTAL_STARS - num; i++) {
      stars.push(
        <div>
            <img src="dullStar.svg"></img>
        </div>
      );
    }
    return stars;
  }
  return (
    <div className="flex">
      <div className="flex flex-col flex-grow my-5 overflow-auto max-h-100">
        {Reviews.map((value, index) => {
          return (
            <div key={index} className="flex flex-grow flex-row">
              <div className="flex flex-grow my-2 mx-2 rounded-lg bg-light-grey py-6 px-5">
                <div className="flex flex-col flex-grow">
                  <div>
                    <p className="text-base font-bold">{value.review_title}</p>
                  </div>
                  <div className="text-sm text-gray-500 my-auto">
                    <p>{value.reviewed_date}</p>
                  </div>
                </div>
                <div className="flex flex-row-reverse">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="mr-4">
                        <p>Interview experience</p>
                      </div>
                      <div className="flex flex-row">
                        {setStars(value.interview_experience)}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="mr-4">
                        <p>Co-op experience</p>
                      </div>
                      <div className="flex flex-row ml-5">
                        {setStars(value.coop_experience)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center border-2 rounded-lg mr-6 px-4 border-gray-400">
                    <p className="mx-2 font-bold text-gray-400">
                      Ask a question
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <p className="text-xs mx-auto my-2 text-gray-300">
          You've reached the end of the list
        </p>
      </div>
    </div>
  );
}
