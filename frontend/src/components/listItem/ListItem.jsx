import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import e from "cors";

export default function ListItem({ index,item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({})
  let [like, setLike] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userID= user._id;

  useEffect(()=>{
    const getMovie =async ()=>{
      try{
        const res = await axios.get("/movies/find/"+item, {
          headers:{
                 token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
              },
        });
        setMovie(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getMovie();
  },[item])
  // if(movie.likes !== undefined  ){
  //     const userExists = movie.likes.some((user) => user.user === userID);
  
  //       if (userExists) like = true
  //   }
  

  // if (movie.likes.length === 0) {
  //   console.log('Array is empty');
  // } else {
  //   console.log(movie.likes.includes(user._id)); // Only check includes if the array is not empty
  // }
  
  
  const handleLikeButton = async (id)=>{

      try{
      const endpoint = like ? '/unlike' : '/like';
      const res = await axios.put(`/movies${endpoint}/${id}`,{}, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
    }catch(err){
          console.log(err);
      }
       setLike(!like);
        console.log(like)


  }
  return (
    <div state={ movie }>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onclick={handleLikeButton}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
     <img
        src={movie.img}
        alt=""
      />
      {isHovered && (
        <>

        <video src={movie.trailer} autoPlay={true} loop muted/>
          <div className="itemInfo" >
            <div className="icons">
              <Link to="/watch" state={ movie } ><PlayArrow className="icon" /></Link>
              <Add className="icon" />
              <ThumbUpAltOutlined className={"" + (like ? "icon liked":"icon")} onClick={()=>handleLikeButton(movie._id)}/>
            </div>
              <span>{movie.title}</span>
            <div className="itemInfoTop">
              <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  </div>
  );
}