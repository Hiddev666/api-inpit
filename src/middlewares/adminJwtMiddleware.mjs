import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const adminJwtMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  try {
    if (token) {
      const sterilToken = token.split(" ")[1];

      jwt.verify(sterilToken, process.env.JWT_KEY, (err, result) => {
        if (err) return res.fail("Invalid Token", err.message);
        req.result = result;
        res.cookie("jwt", sterilToken);
        next();
      });
    } else {
      res.fail("Your Not Authenticated");
    }
  } catch (err) {
    res.fail("Your Not Authenticated", err);
  }
};
