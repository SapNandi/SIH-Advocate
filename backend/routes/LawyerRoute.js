const express = require("express");
const {
  getAllLawyers,
  createLawyer,
  updateLawyer,
  deleteLawyer,
  getLawyerDetails,
} = require("../controllers/lawyerController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

const router = express.Router();

router.route("/lawyer").get(getAllLawyers);

router
  .route("/lawyer/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createLawyer);

router
  .route("/lawyer/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateLawyer);

router
  .route("/lawyer/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteLawyer);

router.route("/lawyer/:id").get(getLawyerDetails);

module.exports = router;
