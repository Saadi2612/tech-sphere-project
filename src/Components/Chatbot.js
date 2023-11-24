import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Chat with us",
        botConversationDescription: "This chatbot was built by Techsphere",
        botId: "91171f80-58d7-473f-907f-94db9dbeba78",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "91171f80-58d7-473f-907f-94db9dbeba78",
        lazySocket: true,
        themeName: "prism",
        frontendVersion: "v1",
        useSessionStorage: true,
        enableConversationDeletion: true,
        theme: "prism",
        botName: "Techsphere ",
        themeColor: "#6441a5",
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
