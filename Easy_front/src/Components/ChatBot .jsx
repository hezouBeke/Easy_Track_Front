import React from "react";
import { Widget, addResponseMessage, handleNewUserMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from "../../assets/logo2.png"; // Remplacez par le chemin vers votre logo

const ChatBot = () => {
    React.useEffect(() => {
        addResponseMessage("Bienvenue sur EasyTrack ! Comment puis-je vous aider ?");
    }, []);

    const handleUserMessage = (newMessage) => {
        console.log(`New message from user: ${newMessage}`);
        // Vous pouvez ici traiter les messages et ajouter des réponses automatiques
        addResponseMessage("Merci pour votre message ! Nous reviendrons vers vous bientôt.");
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 1000, // Assurez-vous qu'il soit visible au-dessus des autres éléments
            }}
        >
            <Widget
                handleNewUserMessage={handleUserMessage}
                profileAvatar={logo}
                title="EasyTrack Chatbot"
                subtitle="Nous sommes là pour vous aider"
            />
        </div>
    );
};

export default ChatBot;
