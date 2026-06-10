import { Router } from "express";

import AuthController from "../controllers/AuthController.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

// router.post(
//   "/auth/login",
//   AuthController.login
// );

router.post("/auth/login", AuthController.Login);
router.post("/auth/refresh-token", AuthController.RefreshToken);
router.post("/auth/logout", AuthController.Logout);
router.post("/auth/forgot-password", AuthController.ForgotPassword);
router.post("/auth/reset-password", AuthController.ResetPassword);

router.get("/auth/me", AuthController.getMe);


export default router;