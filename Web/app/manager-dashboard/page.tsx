import React from "react";

type Props = {};

type Result = {
  fitnessCenterEmail: string;
  fitnessCenterName: string;
  userName: string;
  userEmail: string;
  Time: string;
  Date: string;
};

const userData = {
  fitnessCenterEmail: "koladiyahit45@gmail.com",
  fitnessCenterName: "hammar",
};

const getData = async () => {
  const response = await fetch("http://localhost:5000/mysubscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    console.log(response);

    throw new Error("Something went wrong!");
  }

  const result: Result[] = await response.json();

  return result;
};

const Dashboard = async (props: Props) => {
  const data: Result[] = await getData();
  // console.log(data);

  return (
    <div className="rounded-lg overflow-hidden min-h-full">
      <table className="w-full text-sm text-left text-gray-400 rounded-xl">
        <thead className="text-sm font-extrabold text-gray-900 uppercase bg-[#f7ab0a]/10 border-b py-2 border-[#f7ab0a]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr.
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className="border-b text-black even:bg-gray-200 odd:bg-gray-100">
              <td className="px-6 py-4">{index + 1}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {item.userName}
              </th>
              <td className="px-6 py-4">{item.Date}</td>
              <td className="px-6 py-4">{item.Time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
