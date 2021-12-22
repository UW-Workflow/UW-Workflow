import { useState } from "react";
export default function ReviewDetails() {
  const [reviewsDetails, setReviews] = useState({
    reviewed_date: "3 days ago",
    interview_experience_rating: 3, // out of 5,
    coop_experience_rating: 5, // out of 5
    interview_experience:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    coop_experience:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  });
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
        {reviewsDetails && (
          <div className="flex flex-grow flex-row">
            <div className="flex flex-grow my-2 mx-2 rounded-lg bg-light-grey py-6 px-5">
              <div className="flex flex-col flex-grow">
                <div className="flex flex-row">
                  <div>
                    <p className="text-base font-bold">Interview Experience</p>
                  </div>
                  <div className="flex flex-row">
                    {setStars(reviewsDetails.interview_experience_rating)}
                  </div>
                </div>

                <div className="text-sm text-gray-500 my-auto">
                  <p>{reviewsDetails.interview_experience}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {reviewsDetails && (
          <div className="flex flex-grow flex-row">
            <div className="flex flex-grow my-2 mx-2 rounded-lg bg-light-grey py-6 px-5">
              <div className="flex flex-col flex-grow">
                <div className="flex flex-row">
                  <div>
                    <p className="text-base font-bold">Coop Experience</p>
                  </div>
                  <div className="flex flex-row">
                    {setStars(reviewsDetails.coop_experience_rating)}
                  </div>
                </div>
                <div className="text-sm text-gray-500 my-auto">
                  <p>{reviewsDetails.coop_experience}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
