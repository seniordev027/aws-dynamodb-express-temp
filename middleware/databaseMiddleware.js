import { dynamoClient, TABLE_MEMBERS } from "../database/database.js";

export const databaseMiddleware = async (req, res, next) => {
  try {
    const params = {
      TableName: TABLE_MEMBERS,
    };
    const members = await dynamoClient.scan(params).promise();
    console.log(`Successfully connected to ${TABLE_MEMBERS}`);
    next();
  } catch (err) {
    console.log(`Table ${process.env.DYNAMODB_TABLE} Not Found`);
  }
};
