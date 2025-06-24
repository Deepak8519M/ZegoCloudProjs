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

  function invite() {
    const targetUser = {
      userID: prompt("Enter Callee's userId: "),
      userName: prompt("Enter Callee's userName: "),
    };
    zpRef.current
      .sendCallInvitation({
        callees: [targetUser],
        callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
        timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
      })
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return <div></div>;
}

export default App;
