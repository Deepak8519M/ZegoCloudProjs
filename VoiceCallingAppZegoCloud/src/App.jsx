import React, { useEffect, useRef } from "react";

import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function App() {
  const zpRef = useRef(null);

  const userID = "user" + Math.floor(Math.random() * 1000);
  const userName = "react_" + userID;
  const appID = 638367256;
  const serverSecret = "0431c19bb72748171026c520012b7a1a";

  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    null,
    userID,
    userName
  );

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp;
    zp.addPlugins({ ZIM });
  }, [TOKEN]);

  function invite(callType) {
    const targetUser = {
      userID: prompt("Enter Callee's userId : "),
      userName: prompt("Enter Callee's userName : "),
    };
    zpRef.current
      .sendCallInvitation({
        callees: [targetUser],
        callType,
        timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
      })
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <div className="w-full h-screen bg-linear-to-b from-[#1a2229] to-black flex items-center justify-center ">
      <div className="w-[600px] h-[500px] bg-[#0d1014] border-3 border-[#313030] rounded-xl flex flex-col items-center justify-center gap-10">
        <h2 className="text-white text-[20px]">
          <span className="text-blue-500">User Name : </span>
          {userName}
        </h2>

        <h2 className="text-white text-[20px]">
          <span className="text-blue-500">User Id : </span>
          {userID}
        </h2>

        <button
          className="w-[200px] h-[50px] rounded-[4px] cursor-pointer border-transparent bg-white text-black text-[20px]"
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
        >
          Voice Call
        </button>
        <button
          className="w-[200px] h-[50px] rounded-[4px] cursor-pointer border-transparent bg-white text-black text-[20px]"
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
        >
          Video Call
        </button>
      </div>
    </div>
  );
}

export default App;
