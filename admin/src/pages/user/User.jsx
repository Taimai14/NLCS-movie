import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { Link,useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./user.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/SIdebar";

export default function User() {
  const location = useLocation();
  const user = location.state;
  console.log(user)

  const [data,setData] = useState({
    username:'',
    email:'',
    password:'',
  })

  const handleChange = async (e) => {
        e.preventDefault();
        const {username,email,password} = data;
        try {
            await axios.put(`${user._id}`, {username,email,password },{
                headers: {
                    token:
                      "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                  },
            });
            setData({});
            window.location.reload();
        } catch (err) {}
  };
  return (
     <>
         <Topbar/>
          <div className="container">
          <Sidebar/>
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      {/* {<Link to="/newUser">
        <button className="userAddButton">Create</button>
      </Link>} */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{Date(user.createdAt)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  value={data.username || ''} onChange={(e) => setData({...data,username: e.target.value})}
                />
              </div>
              <div className="userUpdateItem">
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  value={data.email || ''} onChange={(e) => setData({...data,email: e.target.value})}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="..."
                  className="userUpdateInput"
                  value={data.password || ''} onChange={(e) => setData({...data,password: e.target.value})}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleChange}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
          </div>
    </>
  );
}