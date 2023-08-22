const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireSignIn } = require("../middleware/authMiddleware");

//admin routes
router.route("/company").get(adminController.getAllCompanies);
router.route("/company/create").post(adminController.registerCompanyController);
router.route("/company/login").post(adminController.loginCompanyController);
router
  .route("/company/update/:id", requireSignIn)
  .patch(adminController.updateCompanyInfo);
router
  .route("/company/delete/:id", requireSignIn)
  .delete(adminController.deleteCompany);
router
  .route("/company/:compId/employee", requireSignIn)
  .post(adminController.createEmployee);
router
  .route("/company/:compId/employee", requireSignIn)
  .get(adminController.getAllEmployees);
router
  .route("/company/:compId/employee/update/:empId", requireSignIn)
  .patch(adminController.updateEmployeeInfo);
router
  .route("/company/:compId/employee/delete/:empId", requireSignIn)
  .delete(adminController.deleteEmployee);
// router
//   .route("/company/:compId/employee/empId")
//   .get(adminController.getOneEmployee);

//employee routes

module.exports = router;
