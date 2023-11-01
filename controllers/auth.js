import { v4 as uuidv4 } from "uuid";
import { dynamoClient, TABLE_MEMBERS } from "../database/database.js";
import randomstring from "randomstring";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const generateApiKey = randomstring.generate({
      length: 30,
    });
    const user = {
      id: `${uuidv4()}`,
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      role: req.body.role || "user",
      apiKey: generateApiKey,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const params = {
      TableName: TABLE_MEMBERS,
      Item: user,
    };
    await dynamoClient.put(params).promise();
    // const folderName = `user`;
    // const folderParams = {
    //   Bucket: S3_BUCKETNAME,
    //   Key: `${folderName}/`,
    // };
    // await s3Client.putObject(folderParams).promise();
    // const userJSON = JSON.stringify(user);
    // const s3Params = {
    //   Bucket: S3_BUCKETNAME,
    //   Key: `user-signup-${uuidv4()}-${new Date().toISOString()}.json`,
    //   Body: userJSON,
    // };

    // await s3Client.upload(s3Params).promise();
    res.json({
      status: 200,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.json({ status: 500, message: err });
  }
};
