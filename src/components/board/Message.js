import React from "react";

const Message = ({ chat, user }) => (
  <li className={`chat ${user === chat.username ? "right" : "left"}`}>
    <p>{chat.content}</p>
  </li>
);

export default Message;
