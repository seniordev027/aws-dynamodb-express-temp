import { Router } from "express";
import {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user-controlers.js";
import { userFindMiddleware } from "../middleware/findUserMiddleware.js";
const router = Router();

router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", userFindMiddleware, updateUser);
router.delete("/users/:id", userFindMiddleware, deleteUser);

export default router;
