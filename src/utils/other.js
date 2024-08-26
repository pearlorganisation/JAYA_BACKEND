import dotenv from "dotenv";
dotenv.config();

// @@------------------------------REGEX---------------------------------------------------------------------------
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,14}$/;

//@@-------------------------------JWT------------------------------------------------------------

export const accessToken = (res, token, token_type) => {
  return res.cookie("DESIGN_DESTINATION_TOKEN", token, {
    httpOnly: true,
    expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  });
};

export const refreshToken = (res, token) => {
  return res.cookie("DESIGN_DESTINATION_TOKEN", token, {
    httpOnly: true,
    expiresIn: process.env.REFRESH_TOKEN_VALIDITY,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  });
};
