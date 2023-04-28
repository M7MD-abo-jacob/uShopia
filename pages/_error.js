import React from "react";

const Error = ({ statusCode }) => {
  return (
    <p>{statusCode ? `a ${statusCode} error occurred` : "an error occurred"}</p>
  );
};

export default Error;

export function getInitialProps({ req, res }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
}
