import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function CompanyLogistics(props) {
  const [salaryData, setSalaryData] = useState<
    { name: string; average_salary: number }[]
  >();
  const [interviewData, setInterviewData] = useState<
    { name: string; average_interview_rating: number }[]
  >();
  const [coopRatingData, setCoopRatingData] = useState<
    { name: string; average_work_rating: number }[]
  >();

  useEffect(() => {
    async function getRoles() {
      try {
        const response = await axios.get(`/api/roles/getRolesByCompany`, {
          params: {
            companyId: props.companyId,
          },
        });
        if (response.data.roles.length > 0) {
          setSalaryData(
            response.data.roles
              .map((r) => {
                return {
                  name: r.title_name,
                  average_salary: r.avg_salary ? r.avg_salary.toFixed(2) : 0.0,
                };
              })
              .sort((a, b) => {
                return a.average_salary - b.average_salary;
              })
          );
          setInterviewData(
            response.data.roles
              .map((r) => {
                return {
                  name: r.title_name,
                  average_interview_rating: Number(
                    r.avg_interview_rating
                  ).toFixed(0),
                };
              })
              .sort((a, b) => {
                return a.average_interview_rating - b.average_interview_rating;
              })
          );
          setCoopRatingData(
            response.data.roles
              .map((r) => {
                return {
                  name: r.title_name,
                  average_work_rating: Number(r.avg_coop_rating).toFixed(0),
                };
              })
              .sort((a, b) => {
                return a.average_work_rating - b.average_work_rating;
              })
          );
        }
      } catch (error) {
        toast("Error in get roles by company for company page. " + error);
      }
    }
    getRoles();
  }, [props.companyId]);

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
            <XAxis
              dataKey="name"
              fontSize={12}
              tickFormatter={(v) =>
                typeof v === "string"
                  ? v
                      .split(" ")
                      .map((s) => s.charAt(0))
                      .join("")
                  : ""
              }
            />
            <YAxis tick={false} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ left: 0 }} />
            <Area
              type="monotone"
              dataKey="average_salary"
              name="Average Salary"
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
            <XAxis
              dataKey="name"
              fontSize={12}
              tickFormatter={(v) =>
                typeof v === "string"
                  ? v
                      .split(" ")
                      .map((s) => s.charAt(0))
                      .join("")
                  : ""
              }
            />
            <YAxis tick={false} />
            <Tooltip />
            <Legend
              iconType="star"
              fontSize={10}
              wrapperStyle={{ left: 0, bottom: -25 }}
            />
            <Area
              type="monotone"
              dataKey="average_interview_rating"
              name="Average Interview Rating"
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
            <XAxis
              dataKey="name"
              fontSize={12}
              tickFormatter={(v) =>
                typeof v === "string"
                  ? v
                      .split(" ")
                      .map((s) => s.charAt(0))
                      .join("")
                  : ""
              }
            />
            <YAxis tick={false} />
            <Tooltip />
            <Legend iconType="star" fontSize={10} wrapperStyle={{ left: 0 }} />
            <Area
              type="monotone"
              dataKey="average_work_rating"
              name="Average Work Rating"
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
