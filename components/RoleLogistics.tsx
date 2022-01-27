import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Legend,
  Area,
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
    <div className="lg:flex-row xl:flex-row sm:flex-col md:flex-col flex flex-col -ml-6 rounded-lg my-5 overflow-y-scroll bg-white  max-h-100">
      <div
        className="backdrop-opacity-25"
        style={{ width: "100%", height: 300 }}
      >
        <ResponsiveContainer>
          <AreaChart
            data={salaryData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" fontSize={12} />
            <YAxis tick={false} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ left: 0 }} />
            <Area
              type="monotone"
              dataKey="salary"
              name="Salary"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorSalary)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div
        className="backdrop-opacity-25"
        style={{ width: "100%", height: 275 }}
      >
        <ResponsiveContainer>
          <AreaChart
            data={interviewData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorInterview" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" fontSize={12} />
            <YAxis tick={false} />
            <Tooltip />
            <Legend
              iconType="star"
              fontSize={10}
              wrapperStyle={{ left: 0, bottom: -25 }}
            />
            <Area
              type="monotone"
              dataKey="interview_rating"
              name="Interview Rating"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorInterview)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div
        className="backdrop-opacity-25"
        style={{ width: "100%", height: 300 }}
      >
        <ResponsiveContainer>
          <AreaChart
            data={coopRatingData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCoop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" fontSize={12} />
            <YAxis tick={false} />
            <Tooltip />
            <Legend iconType="star" fontSize={10} wrapperStyle={{ left: 0 }} />
            <Area
              type="monotone"
              dataKey="work_rating"
              name="Work Rating"
              stroke="#ffc658"
              fillOpacity={1}
              fill="url(#colorCoop)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
