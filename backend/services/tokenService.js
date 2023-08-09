const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refreshModel");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "1y",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (token, userId) => {
  try {
    await refreshModel.create({
      token,
      userId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const verifyAccessToken = async (token) => {
  return jwt.verify(token, accessTokenSecret);
};

const verifyRefreshToken = async (refreshToken) => {
  return jwt.verify(refreshToken, refreshTokenSecret);
};

const findRefreshToken = async (userId, refreshToken) => {
  return await refreshModel.findOne({ userId: userId, token: refreshToken });
};

const updateRefreshToken = async (userId, refreshToken) => {
  return await refreshModel.updateOne(
    { userId: userId },
    { token: refreshToken }
  );
};

const removeToken = async (refreshToken) => {
  return await refreshModel.deleteOne({ token: refreshToken });
};

module.exports = {
  generateTokens,
  storeRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  findRefreshToken,
  updateRefreshToken,
  removeToken,
};
