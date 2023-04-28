import axios from "@/lib/axios";

export default async function POST(req, res) {
  try {
    const response = await axios.post("/register", {
      user: req.body.user,
      pwd: req.body.pwd,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
}
