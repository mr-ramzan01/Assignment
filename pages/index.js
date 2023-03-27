import Card from "@/components/card";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import searchIcon from "../public/search.png";

export default function Home({ data }) {
  const [pokemon, setPokemon] = useState(data);
  const [page, setPage] = useState(1);
  const [totalLength, setTotalLength] = useState(data.count);
  const [pokedata, setPokedata] = useState();
  const [search, setSearch] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetching next data for pagination
  const moreData = async () => {
    setPage((prev) => prev + 1);
    let res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}&limit=20`
    );
    setPokemon(res.data);
  };

  // Fetching previous data for pagination
  const prevData = async () => {
    setPage((prev) => prev - 1);
    let res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}&limit=20`
    );
    setPokemon(res.data);
  };

  // Searching the pokemon and fetching result
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
      setPokedata(res.data.forms[0]);
      setSearch("");
      setLoading(false);
    } catch (err) {
      setPokedata([]);
      setLoading(false);
      setErr("No Results Found for this query !");
    }
  };

  // updating the state on every input change
  const handleInputChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setPokedata();
      setErr("");
    }
  };
  return (
    <>
      <div className="m-5">
        <div className="flex items-center justify-between px-3">
          <input
            className="rounded-[6px] p-[1rem] w-[85%] transition-all duration-300 outline-none shadow-lg focus:border-none focus:shadow-sm placeholder-gray-400 font-[450]"
            type="text"
            placeholder="Search for Pokemon"
            value={search}
            onChange={async (e) => {
              handleInputChange(e);
            }}

            // adding enter button functionality
            onKeyUp={async (e) => {
              if (e?.code === "Enter") {
                handleSubmit();
              }
            }}
          />
          <button
            className="h-[55px] w-[10%] rounded-[10px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-bg duration-200 hover:bg-[teal] flex justify-center items-center"
            onClick={handleSubmit}
          >
            <img
              className="h-[40px] w-[auto]"
              src={searchIcon.src}
              alt="search"
            />
          </button>
        </div>
        <div className="grid grid-cols-5 lg:grid-cols-4 md:grid-col-3 sm:grid-col-2 md:gap-3 gap-4 p-4">
          {loading ? (
            <div className="w-[100vw] text-white text-center">Loading...</div>
          ) : !pokedata ? (
            pokemon?.results?.map((el) => (
              <Link key={el.name} href={`/${el.name}`}>
                <Card name={el.name} url={el.url} />
              </Link>
            ))
          ) : err.length != 0 ? (
            <div className="w-[90vw] h-[70vh] flex justify-center pt-10 items-start font-bold text-[red] font-sans">{`"${err}"`}</div>
          ) : (
            <Link key={pokedata.name} href={`/${pokedata.name}`}>
              <Card name={pokedata.name} url={pokedata.url} />
            </Link>
          )}
        </div>
        {/* pagination buttons */}
        {!pokedata && loading==false && (
          <div className="flex justify-center w-[fit-content] m-[auto] gap-3 mb-5">
            <button
              className="p-3 px-10 rounded-[10px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-[white] transition-all duration-300 hover:bg-[teal]"
              disabled={page === 1}
              onClick={prevData}
            >
              Prev
            </button>
            <button className="text-[1rem] text-white font-sans font-[500]">
              {page}
            </button>
            <button
              className="p-3 px-10 rounded-[10px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-[white] transition-all duration-300 hover:bg-[teal]"
              disabled={page === Math.ceil(totalLength / 20) - 1}
              onClick={moreData}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// Fetching data before mounting the Home page
export const getStaticProps = async () => {
  let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon`);

  // Sending data as a props
  return {
    props: {
      data,
    },
  };
};
