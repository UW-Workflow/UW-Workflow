import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Review } from "../models/interfaces/types/Review";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useRouter } from "next/router";
import { SORT } from "../constants/sort";

export default function Reviews(props) {
  let [reviews, setReviews] = useState<Review[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getReviews() {
      try {
        let response;
        if (props.sortBy === SORT.SALARY) {
          response = await axios.get(
            `/api/reviews/getReviewsByRole/getReviewsByRoleSalary`,
            {
              params: {
                roleId: props.roleId,
              },
            }
          );
        } else if (props.sortBy === SORT.INTERVIEW) {
          response = await axios.get(
            `/api/reviews/getReviewsByRole/getReviewsByRoleInterview`,
            {
              params: {
                roleId: props.roleId,
              },
            }
          );
        } else if (props.sortBy === SORT.TIME) {
          response = await axios.get(
            `/api/reviews/getReviewsByRole/getReviewsByRoleTime`,
            {
              params: {
                roleId: props.roleId,
              },
            }
          );
        } else {
          response = await axios.get(
            `/api/reviews/getReviewsByRole/getReviewsByRoleCoop`,
            {
              params: {
                roleId: props.roleId,
              },
            }
          );
        }
        if (response.data.reviews && response.data.reviews.length > 0) {
          setReviews(response.data.reviews);
        } else setReviews([]);
      } catch (error) {
        toast("Error in getting reviews by role for role page. " + error);
      }
    }
    getReviews();
  }, [props.roleId, props.sortBy]);
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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push({
                  pathname: "/companies/[id]/[role]/[review]",
                  query: {
                    id: props.companyId,
                    role: props.roleId,
                    review: value.id,
                  },
                });
              }}
              key={index}
              className="flex flex-grow flex-col sm:flex-row"
            >
              {
                <div className="flex flex-col sm:flex-row flex-grow my-2 mx-2 rounded-lg bg-light-grey py-6 px-5">
                  <div className="flex flex-col flex-grow">
                    <div className="text-base font-bold">
                      <Link
                        href="/companies/[id]/[role]/[review]"
                        as={`/companies/${props.companyId}/${props.roleId}/${value.id}`}
                      >
                        {value.work_experience.substr(0, 15) + " ..."}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-500 my-auto">
                      <p>Co-op from {value.year_worked}</p>
                    </div>
                    <div className="hidden sm:block mt-4">
                      <p className="text-xs text-gray-300">
                        {moment.parseZone(value.time_created).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-row-reverse my-4">
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
                  </div>
                  <div className="sm:hidden mt-4">
                    <p className="text-xs text-gray-300">
                      {moment.parseZone(value.time_created).fromNow()}
                    </p>
                  </div>
                </div>
              }
            </div>
          );
        })}
        {reviews.length === 0 && (
          <p className="text-xs mx-auto my-2 text-gray-300">
            No Reviews added yet.
            <a
              style={{ cursor: "pointer", color: "#86c5da" }}
              onClick={() => {
                router.push({
                  pathname: "/addReview",
                  query: { company_id: props.companyId, role_id: props.roleId },
                });
              }}
            >
              &nbsp;Click here&nbsp;
            </a>
            to add a review
          </p>
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
