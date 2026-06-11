import { Router } from "express";

import LoginController from "../controllers/LoginController.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

// router.post(
//   "/auth/login",
//   LoginController.login
// );

router.post("/auth/login", LoginController.Login);
router.post("/auth/refresh-token", LoginController.RefreshToken);
router.post("/auth/logout", LoginController.Logout);
router.post("/auth/forgot-password", LoginController.ForgotPassword);
router.post("/auth/reset-password", LoginController.ResetPassword);

router.get("/auth/me", LoginController.getMe);


export default router;