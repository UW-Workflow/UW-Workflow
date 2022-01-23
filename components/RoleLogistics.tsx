import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
} from "recharts";

export default function RoleLogistics(props) {
  const [salaryData, setSalaryData] = useState<
    { year: number; salary: number }[]
  >();
  const [interviewData, setInterviewData] = useState<
    { year: number; interview_rating: number }[]
  >();
  const [coopRatingData, setCoopRatingData] = useState<
    { year: number; work_rating: number }[]
  >();

  useEffect(() => {
    async function getReviews() {
      try {
        const response = await axios.get(`/api/reviews/getReviewsByRole`, {
          params: {
            roleId: props.roleID,
          },
        });
        if (response.data.reviews.length > 0) {
          const salaries = response.data.reviews.map((r) => {
            return {
              year: r.year_worked,
              salary: r.salary ? r.salary.toFixed(2) : null,
            };
          });
          const interviewRatings = response.data.reviews.map((r) => {
            return {
              year: r.year_worked,
              interview_rating: r.interview_experience_rating,
            };
          });
          const coopRatings = response.data.reviews.map((r) => {
            return {
              year: r.year_worked,
              work_rating: r.work_experience_rating,
            };
          });
          setSalaryData(
            salaries.sort(function (a, b) {
              return a.year - b.year;
            })
          );
          setInterviewData(
            interviewRatings.sort(function (a, b) {
              return a.year - b.year;
            })
          );
          setCoopRatingData(
            coopRatings.sort(function (a, b) {
              return a.year - b.year;
            })
          );
        }
      } catch (error) {
        toast("Error in get reviews by role for role page. " + error);
      }
    }
    getReviews();
  }, [props.roleId]);

  return (
    <div className="flex flex-col flex-grow rounded-lg  my-5 shadow bg-white overflow-auto max-h-100">
      <div className="p-3 backdrop-opacity-25" style={{ width: "70%" }}>
        <h1 className=" ml-16 mb-6 text-lg">Reveiewed Salary by Year</h1>
        <ScatterChart
          width={1250}
          height={400}
          data={salaryData}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="year" />
          <YAxis dataKey="salary" unit="$" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={salaryData} fill="rgba(50, 107, 255, 0.7)" />
        </ScatterChart>
      </div>
      <div className="p-3 backdrop-opacity-25">
        <h1 className=" ml-16 mb-6 text-lg">
          Reviewed Interview Rating by Year
        </h1>
        <ScatterChart
          width={1250}
          height={400}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="year" />
          <YAxis dataKey="interview_rating" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={interviewData} fill="rgba(50, 107, 255, 0.7)" />
        </ScatterChart>
      </div>
      <div className="p-3 backdrop-opacity-25">
        <h1 className=" ml-16 mb-6 text-lg">Reviewed Work Rating by Role</h1>
        <ScatterChart
          width={1250}
          height={400}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="year" />
          <YAxis dataKey="work_rating" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={coopRatingData} fill="rgba(50, 107, 255, 0.7)" />
        </ScatterChart>
      </div>
    </div>
  );
}
