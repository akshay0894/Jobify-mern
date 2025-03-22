"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const useController_1 = require("../controllers/useController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get("/current-user", useController_1.getCurrentUser);
router.get("/admin/app-stats", [
    (0, authMiddleware_1.authorizePermissions)("admin"),
    useController_1.getApplicationStats,
]);
router.post("/update-user", authMiddleware_1.checkForTestUser, useController_1.updateUser);
exports.default = router;
