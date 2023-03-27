import React from "react";

const Progress = ({progress}) => {
  return (
    <>
        <div className="h-1 m-2 w-[40%] bg-gray-200 rounded-full">
            <div
                className={`h-full ${progress < 50 ? 'bg-red-500': 'bg-green-500'} rounded-full`}
                style={{ width: `${progress}%` }}
            />
        </div>
    </>
  );
};

export default Progress;
