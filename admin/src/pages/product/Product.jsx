import { Link,useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./product.css";
import { Publish } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/SIdebar";

export default function Product() {
  const location = useLocation();
  const movie = location.state;

  const [data,setData] = useState({
    title:'',
    genre:'',
    year:'',
  })

  const handleChange = async (e) => {
        e.preventDefault();
        const {title,genre,year} = data;
        try {
            await axios.put(`${movie._id}`, {title,genre,year },{
                headers: {
                    token:
                      "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                  },
            });
            setData({});
        } catch (err) {}
  };
  return (
    <>
         <Topbar/>
          <div className="container">
          <Sidebar/>
   <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>

          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={movie.title} value={data.title || ''} onChange={(e) => setData({...data,title: e.target.value})}/>
            <label>Year</label>
            <input type="text" placeholder={movie.year} value={data.year || ''} onChange={(e) => setData({...data,year: e.target.value})}/>
            <label>Genre</label>
            <input type="text" placeholder={movie.genre} value={data.genre || ''} onChange={(e) => setData({...data,genre: e.target.value})}/>

            {/* <label>Trailer</label>
            <input type="file" placeholder={movie.trailer} />
            <label>Video</label>
            <input type="file" placeholder={movie.video} /> */}
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={movie.img}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleChange}>Update</button>
          </div>
        </form>
      </div>
    </div>
          </div>
    </>
  );
}