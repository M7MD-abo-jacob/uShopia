import axios from "@/lib/axios";

export default async function POST(req, res) {
  try {
    const response = await axios.get("/refresh", {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(error.response.status).json({ message: error.message });
  }
}
