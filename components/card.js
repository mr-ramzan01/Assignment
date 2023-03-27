import React from "react";

const Card = ({ name, url }) => {
  // Getting the index for the pokemon image
  const ind = url.split("/")[url.split("/").length - 2];
  return (
    // Pokemon card component
    <div className=" bg-white flex flex-col items-center p-4 rounded-[10px] transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
      <h3 className="w-[fit-content]">{name}</h3>
      <img
        className=""
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ind}.png`}
        alt=""
      />
    </div>
  );
};

export default Card;
