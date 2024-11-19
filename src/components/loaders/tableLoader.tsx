import React from "react";

interface SkeletonLoaderProps {
  rows?: number;
  columns?: number;
}

const TableLoader: React.FC<SkeletonLoaderProps> = ({ rows = 10, columns = 1 }) => {
  return (
    <div className="animate-pulse  dark:bg-darkBlue">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-4 py-3 dark:bg-gray-800">
                <div className="h-6 bg-[#e2e2e2] dark:bg-gray-700 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  <div className="h-6 bg-[#e2e2e2] dark:bg-gray-700 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoader;
