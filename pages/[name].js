import Card from '@/components/card';
import SingleCard from '@/components/singlecard';
import axios from 'axios';
import React from 'react'

const Name = ({data}) => {
    if(Object.keys(data).length == 0) {
        return <div className="w-[90vw] h-[70vh] flex justify-center pt-10 items-start font-bold text-[red] font-sans">Not Found</div>
    }
    return (
        <>
        {
            <SingleCard data={data} />
        }
        </>
    )
}

export default Name;

export const getServerSideProps = async (context) => {
    const {name} = context.query;
    let data;
    try {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        data = res.data;
    }
    catch(err) {
        data = {};
    }
    return {
      props: {
        data
      },
    };
  };