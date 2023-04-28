// this is a test page to test roles authorization
// this is only available to users with "admin" role, nothing to see here ;)

import Head from "next/head";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

export default function Test() {
  const axiosAuth = useAxiosAuth();
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    await axiosAuth
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        toast(err.message);
        console.log(err);
      });
  };
  return (
    <>
      <Head>
        <title>uShopia | Admin page</title>
        <meta
          name="description"
          content="a test page for users with admin role only."
        />
        <meta name="robots" content="noindex" />
      </Head>
      <div>
        <Button onClick={() => fetchUsers()}>get users!!</Button>
        <Button onClick={() => setUsers([])}>clear users!!</Button>
        {users.length > 0 &&
          users.map((user) => <h1 key={user}>{user.username}</h1>)}
      </div>
    </>
  );
}
