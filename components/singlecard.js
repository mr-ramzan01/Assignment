import React from "react";
import Progress from "./progress";

const SingleCard = ({ data }) => {
  console.log(data);
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-solid border-[1px] border-gray gap-[20px] flex flex-row p-4 rounded-[10px] font-sans m-[20px] transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
      <div className="border-solid border-[1px] border-gray rounded-[10px] flex justify-center items-center w-[40%]">
        <div>
          <div>
            <img className="" src={data.sprites.front_default} alt="" />
            <img className="" src={data.sprites.back_default} alt="" />
          </div>
          <div>
            <img className="" src={data.sprites.front_shiny} alt="" />
            <img className="" src={data.sprites.back_shiny} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full border-solid border-[1px] border-gray rounded-[10px] p-3">
        <h3 className="  w-[fit-content] text-[30px] font-sans">
          {data.name}
        </h3>
        <div className="flex flex-row">
          <h5 className="text-[20px] font-medium ">
            Height:{" "}
            <span className=" font-normal text-[18px]">{data.height}</span>
          </h5>
        </div>
        <div className="flex flex-row">
          <h5 className="text-[20px] font-medium ">
            Weight:{" "}
            <span className=" font-normal text-[18px]">{data.weight}</span>
          </h5>
        </div>
        <div className="flex flex-row">
          <h5 className="text-[20px] font-medium ">
            Base Experience:{" "}
            <span className=" font-normal text-[18px]">
              {data.base_experience}
            </span>
          </h5>
        </div>
        <div className="flex flex-row">
          <h5 className="text-[20px] font-medium ">
            Abilities:
            {data.abilities?.map((el) => (
              <span key={el.ability.name} className=" font-normal text-[18px]">
                {" "}
                {el.ability.name}{" "}
              </span>
            ))}
          </h5>
        </div>
        <div className="flex flex-row">
          <h5 className="text-[20px] font-medium ">
            Types:
            {data.types?.map((el) => (
              <span key={el.type.name} className=" font-normal text-[18px]">
                {" "}
                {el.type.name}{" "}
              </span>
            ))}
          </h5>
        </div>
        <div className="">
          <h3 className="text-[20px] font-medium">Stats: </h3>
          <div className="p-2">
            {data.stats?.map((el) => (
              <div
                key={el.stat.name}
                className=" flex flex-row items-center"
              >
                <h5 className="text-[18px]  w-[25%]">
                  {el.stat.name}
                </h5>
                <p className="text-[18px]  w-[5%]">
                  {el.base_stat}
                </p>
                <Progress progress={el.base_stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
