import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    //fetch token from cookie
    const token = req.cookies.token;
    //check token is present or not
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    //verify token using jwt
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    //check decodedToken is present or not
    if (!decodedToken) {
      return res.status(400).json({ message: "Token  not verify" });
    }

    // console.log(decodedToken);

    //stores decodedtoken in userId
    req.userId = decodedToken.userId;
    //callling next
    next();
  } catch (error) {
    return res.status(500).json({ message: "isAuth error" });
  }
};
