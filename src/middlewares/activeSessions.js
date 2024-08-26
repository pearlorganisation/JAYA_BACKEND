import sessionModel from "../models/auth/session.js";
export const checkExistingSession = () => {
  try {
    return async (req, res, next) => {
      const existingSession = await sessionModel.find({
        $and: [{ userId: req?.userId }, { sessionId: req.sessionId }],
      });

      if (existingSession.length > 2) {
        return res.status(200).json({
          status: "SUCCESS",
          message:
            "Maximum limit exceeded please deactivate from previous data",
        });
      }

      next();
    };
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal Server Error",
    });
  }
};
