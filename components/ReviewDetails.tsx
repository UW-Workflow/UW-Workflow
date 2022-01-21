import axios from "axios";
import { useEffect, useState } from "react";
import { Review } from "../models/interfaces/types/Review";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReviewDetails(props) {
  const [review, setReview] = useState<Review>();
  function setStars(num) {
    const TOTAL_STARS = 5;
    var stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(
        <div>
          <img src="/star.svg"></img>
        </div>
      );
    }
    for (let i = 0; i < TOTAL_STARS - num; i++) {
      stars.push(
        <div>
          <img src="/dullStar.svg"></img>
        </div>
      );
    }
    return stars;
  }
  useEffect(() => {
    async function getReviews() {
      try {
        const response = await axios.get(`/api/reviews/getReview`, {
          params: {
            id: props.reviewId,
          },
        });
        if (response.data.reviews.length > 0 && response.data.reviews[0]) {
          setReview(response.data.reviews[0]);
        }
      } catch (error) {
        toast("Error in getting reviews for review details page. " + error);
      }
    }
    getReviews();
  }, [props.reviewId]);
  return (
    <div className="flex">
      <div className="flex flex-col flex-grow my-5 overflow-auto max-h-100">
        {review && (
          <div className="flex flex-grow flex-row">
            <div className="flex flex-grow my-2 mx-2 rounded-lg bg-light-grey py-6 px-5">
              <div className="flex flex-col flex-grow">
                <div className="flex flex-row">
                  <div>
                    <p className="font-bold text-base mr-0.5">
                      Interview Experience
                    </p>
                  </div>
                  <div className="flex flex-row">
                    {setStars(review.interview_experience_rating)}
                  </div>
                </div>

                <div className="text-sm text-gray-500 my-auto">
                  <p>{review.interview_experience}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {review && (
          <div className="flex flex-grow flex-row">
            <div className="flex flex-grow my-2 mx-2 rounded-lg bg-light-grey py-6 px-5">
              <div className="flex flex-col flex-grow">
                <div className="flex flex-row">
                  <div>
                    <p className="text-base font-bold  mr-1">Coop Experience</p>
                  </div>
                  <div className="flex flex-row">
                    {setStars(review.work_experience_rating)}
                  </div>
                </div>
                <div className="text-sm text-gray-500 my-auto">
                  <p>{review.work_experience}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
        />
      </div>
    </div>
  );
}
