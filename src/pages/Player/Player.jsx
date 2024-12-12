import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState, } from 'react';
import { useParams, useNavigate } from'react-router-dom';

const Player = () => {

  const {id}=useParams();
  const navigate=useNavigate();
  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNThmMzA4OTZmM2Q1ZDczNTgwODY3NjM0ZDg1NTdiYSIsIm5iZiI6MTczMzg5MDMyOS40LCJzdWIiOiI2NzU5MTExOTJkMjAwYzg0ZjE5MTE2YmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.c4k-f3KvFB-0_umt8XHAZ9gmoHPLC_pEJplc82KsxlY'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  },[id] )

  return (
    <div className="player">
      <img src={back_arrow_icon} alt=""  onClick={() => navigate(-2)} />
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
        
      </div>
     
    </div>
  )
}

export default Player;