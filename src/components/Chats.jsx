import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log(user);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "791a8823-3361-4b14-b9d7-b137fb475978",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "f838ec7b-caa3-4a3f-905a-b8ddb0d6ee29",
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }, [navigate, user]);

  if (!user || loading) return "loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ChatApp</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="791a8823-3361-4b14-b9d7-b137fb475978"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
