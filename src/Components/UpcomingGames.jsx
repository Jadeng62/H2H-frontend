import React from "react";

const UpcomingGames = () => {
  return (
    <div className="border-2 border-white bg-secondary/30 rounded-lg w-full h-full mb-10">
      <div className="align-middle flex">
        <h1 className="text-4xl bebas-neue-regular p-4">Upcoming Games</h1>
      </div>
      <div className="px-4 pb-4 flex relative overflow-x-auto overflow-y-auto">
        <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-text uppercase bg-accent">
            <tr className="">
              <th scope="col" className="px-6 py-4">
                Date
              </th>
              <th scope="col" className="px-6 py-4">
                Time
              </th>
              <th scope="col" className="px-6 py-4">
                Match Up
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-5">Silver</td>
              <td className="px-6 py-5">Laptop</td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-5">White</td>
              <td className="px-6 py-5">Laptop PC</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-5">Black</td>
              <td className="px-6 py-5">Accessories</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingGames;
