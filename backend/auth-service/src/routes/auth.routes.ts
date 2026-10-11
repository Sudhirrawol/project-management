import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { randomBytes } from "node:crypto";

import { authenticateToken } from "../middleware/auth.middleware.js";

import { requireRole } from "../middleware/role.middleware.js";

const router = Router();

const state = randomBytes(32).toString();

console.log(state);

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

router.get("keycloak/login", (req, res) => {
  const keyclockUrl = new URL(
    "http://localhost:8080/realms/agencyos/protocol/openid-connect/auth",
  );
  keyclockUrl.searchParams.set("client_id", "agency-web");
  keyclockUrl.searchParams.set("response_type", "code");
  keyclockUrl.searchParams.set(
    "redirect_uri",
    "http://localhost:5000/auth/callback",
  );
  keyclockUrl.searchParams.set("scope", "openid");
  res.redirect(keyclockUrl.toString());
});

router.post("/logout", authenticateToken, logout);

export default router;
