import axios from "@/lib/axios";
import Cookies from "cookies";

export default async function POST(req, res) {
  try {
    const response = await axios.post("/auth", {
      user: req.body.user,
      pwd: req.body.pwd,
    });
    const setCookieHeader = response.headers["set-cookie"];
    const refreshTokenCookie = setCookieHeader.find((cookie) =>
      cookie.startsWith("jwt=")
    );
    const maxAgeParam = setCookieHeader.find((cookie) =>
      cookie.startsWith("Max-Age=")
    );
    const expiresParam = setCookieHeader.find((cookie) =>
      cookie.startsWith("Expires=")
    );
    const refreshToken = refreshTokenCookie
      ? refreshTokenCookie.split(";")[0].split("=")[1]
      : null;
    const maxAge = maxAgeParam ? parseInt(maxAgeParam.split("=")[1]) : null;
    const expires = expiresParam ? new Date(expiresParam.split("=")[1]) : null;

    const cookies = new Cookies(req, res);
    cookies.set("jwt", refreshToken, {
      maxAge,
      expires,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(error.response.status).json({ message: error.message });
  }
}
