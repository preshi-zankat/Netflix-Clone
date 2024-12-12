import {useRef,useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";


const TitleCards = ({title,category}) => {

  const [apiData,setApiData]=useState([])
  
  const cardsRef=useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNThmMzA4OTZmM2Q1ZDczNTgwODY3NjM0ZDg1NTdiYSIsIm5iZiI6MTczMzg5MDMyOS40LCJzdWIiOiI2NzU5MTExOTJkMjAwYzg0ZjE5MTE2YmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.c4k-f3KvFB-0_umt8XHAZ9gmoHPLC_pEJplc82KsxlY'
    }
  };
const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft+=event.deltaY
}

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
},[category])
  return (
    <div className="title-cards">
      <h2>{title ? title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link key={index} to={`/player/${card.id}`} className="card">
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
             <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  );
};


export default TitleCards;
