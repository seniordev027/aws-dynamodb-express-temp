import { dynamoClient, TABLE_MEMBERS } from "../database/database.js";
import bcrypt from "bcrypt";

export const getAllUser = async (req, res) => {
  try {
    const params = {
      TableName: TABLE_MEMBERS,
    };
    const members = await dynamoClient.scan(params).promise();
    res.json({
      status: "success",
      data: members.Items,
      total_items: members.Items.length,
    });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const params = {
      TableName: TABLE_MEMBERS,
      Key: {
        id: req.params.id,
      },
    };
    const members = await dynamoClient.get(params).promise();
    res.json({
      status: "success",
      data: members.Item,
    });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = {
      id: req.params.id,
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      role: req.body.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const params = {
      TableName: TABLE_MEMBERS,
      Item: user,
    };
    await dynamoClient.put(params).promise();
    res.json({
      status: 200,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const paramsForFind = {
      TableName: TABLE_MEMBERS,
      Key: {
        id: req.params.id,
      },
    };
    const members = await dynamoClient.get(paramsForFind).promise();
    if (!members.Item) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const params = {
      TableName: TABLE_MEMBERS,
      Key: {
        id: req.params.id,
      },
    };
    await dynamoClient.delete(params).promise();
    res.json({
      status: 200,
      message: "User successfully delete",
    });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};
