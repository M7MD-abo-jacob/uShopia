import axios from "@/lib/axios";

export default async function POST(req, res) {
  try {
    const response = await axios.get("/logout", {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    console.log(response.status);
    res.status(200).json("signed out successfully");
  } catch (error) {
    console.log(error);
    res.status(error.response.status).json(error.message);
  }
}
