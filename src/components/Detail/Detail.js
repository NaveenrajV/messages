import React from "react";

const Detail = ({ id, subject, name, message, email }) => {
  return (
    <tr key={id}>
      <td key={`${id}-${name}`}>{name}</td>
      <td key={`${id}-${email}`}>{email}</td>
      <td key={`${id}-${subject}`}>{subject}</td>
      <td key={`${id}-${message}`}>{message}</td>
    </tr>
  );
};

export default Detail;
