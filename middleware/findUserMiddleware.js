import { dynamoClient, TABLE_MEMBERS } from "../database/database.js";

export const userFindMiddleware = async (req, res, next) => {
  try {
    const params = {
      TableName: TABLE_MEMBERS,
      Key: {
        id: req.params.id,
      },
    };
    const members = await dynamoClient.get(params).promise();
    if (!members.Item) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    res.json({
      status: "success",
    });
    next();
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};
