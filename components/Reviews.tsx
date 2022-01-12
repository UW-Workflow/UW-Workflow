import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Review } from "../models/interfaces/types/Review";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Reviews(props) {
  let [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    async function getReviews() {
      try {
        const response = await axios.get(`/api/reviews/getReviewsByRole`, {
          params: {
            roleId: props.roleId,
          },
        });
        if (response.data.reviews && response.data.reviews.length > 0) {
          setReviews(response.data.reviews);
        }
      } catch (error) {
        toast("Error in getting reviews by role for role page. " + error);
      }
    }
    getReviews();
  }, [props.roleId]);
  function setStars(num) {
    const TOTAL_STARS = 5;
    var stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(
        <div key={i}>
          <img src="/star.svg"></img>
        </div>
      );
    }
    let k = num;
    for (let i = 0; i < TOTAL_STARS - num; i++) {
      stars.push(
        <div key={k + i}>
          <img src="/dullStar.svg"></img>
        </div>
      );
    }
    return stars;
  }
  return (
    <div className="flex">
      <div className="flex flex-col flex-grow my-5 overflow-auto max-h-100">
        {reviews.map((value, index) => {
          return (
            <div key={index} className="flex flex-grow flex-row">
              <Link
                href="/companies/[id]/[role]/[review]"
                as={`/companies/${props.companyId}/${props.roleId}/${value.id}`}
              >
                {
                  <div className="flex flex-grow my-2 mx-2 rounded-lg bg-light-grey py-6 px-5">
                    <div className="flex flex-col flex-grow">
                      <div className="text-base font-bold">
                        <Link
                          href="/companies/[id]/[role]/[review]"
                          as={`/companies/${props.companyId}/${props.roleId}/${value.id}`}
                        >
                          {value.work_experience.substr(0, 15)}
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500 my-auto">
                        <p>{value.year_worked}</p>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse">
                      <div className="flex flex-col">
                        <div className="flex flex-row">
                          <div className="mr-4">
                            <p>Interview experience</p>
                          </div>
                          <div className="flex flex-row">
                            {setStars(value.interview_experience_rating)}
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="mr-4">
                            <p>Co-op experience</p>
                          </div>
                          <div className="flex flex-row ml-5">
                            {setStars(value.work_experience_rating)}
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex items-center border-2 rounded-lg mr-6 px-4 border-gray-400">
                    <p className="mx-2 font-bold text-gray-400">
                      Ask a question
                    </p>
                  </div> */}
                    </div>
                  </div>
                }
              </Link>
            </div>
          );
        })}
        <p className="text-xs mx-auto my-2 text-gray-300">
          You have reached the end of the list
        </p>
      </div>
      <div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
        />
      </div>
    </div>
  );
}
