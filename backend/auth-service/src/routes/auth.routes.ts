import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh", refreshToken);

router.get("/me", authenticateToken, (req, res) => {
  res.json({
    message: "You accessed a protected API",
  });
});

router.get(
  "/admin-test",
  authenticateToken,
  requireRole("admin"),
  (req, res) => {
    res.status(200).json({
      message: "You accessed a protected API",
    });
  },
);

router.post("/logout", authenticateToken, logout);

export default router;
