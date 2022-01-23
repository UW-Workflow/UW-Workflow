import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

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
            response.data.roles.map((r) => {
              return {
                name: r.title_name,
                average_salary: r.avg_salary ? r.avg_salary.toFixed(2) : null,
              };
            })
          );
          setInterviewData(
            response.data.roles.map((r) => {
              return {
                name: r.title_name,
                average_interview_rating: Number(
                  r.avg_interview_rating
                ).toFixed(2),
              };
            })
          );
          setCoopRatingData(
            response.data.roles.map((r) => {
              return {
                name: r.title_name,
                average_work_rating: Number(r.avg_coop_rating).toFixed(2),
              };
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
    <div className="flex flex-col flex-grow rounded-lg  my-5 shadow bg-white overflow-auto max-h-100">
      <div className="p-3 backdrop-opacity-25" style={{ width: "70%" }}>
        <h1 className=" ml-16 mb-6 text-lg">Average Salary by Role</h1>
        <BarChart
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="average_salary" fill="rgba(50, 107, 255, 0.7)" />
        </BarChart>
      </div>
      <div className="p-3 backdrop-opacity-25">
        <h1 className=" ml-16 mb-6 text-lg">
          Average Interview Rating by Role
        </h1>
        <BarChart
          width={1250}
          height={400}
          data={interviewData}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="average_interview_rating"
            fill="rgba(50, 107, 255, 0.7)"
          />
        </BarChart>
      </div>
      <div className="p-3 backdrop-opacity-25">
        <h1 className=" ml-16 mb-6 text-lg">Average Work Rating by Role</h1>
        <BarChart
          width={1250}
          height={400}
          data={coopRatingData}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="average_work_rating" fill="rgba(50, 107, 255, 0.7)" />
        </BarChart>
      </div>
    </div>
  );
}
