// Import the required modules
const express = require("express");
const router = express.Router();

// Import Controllers
const courseController = require("../controllers/Course");
const categoryController = require("../controllers/Category");
const sectionController = require("../controllers/Section");
const subSectionController = require("../controllers/Subsection");
const ratingController = require("../controllers/RatingAndReview");

// Import Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// // Debug check: list all handlers to make sure none are undefined
// console.log("=== Controller Import Check ===");
// console.log({
//   createCourse: courseController.createCourse,
//   showAllCourse: courseController.showAllCourse,
//   getCourseDetails: courseController.getCourseDetails,
//   showAllCategories: categoryController.showAllCategories,
//   createCategory: categoryController.createCategory,
//   categoryPageDetails: categoryController.categoryPageDetails,
//   createSection: sectionController.createSection,
//   updateSection: sectionController.updateSection,
//   deleteSection: sectionController.deleteSection,
//   createSubSection: subSectionController.createSubSection,
//   updateSubSection: subSectionController.updateSubSection,
//   deleteSubSection: subSectionController.deleteSubSection,
//   createRating: ratingController.createRating,
//   getAverageRating: ratingController.getAverageRating,
//   getAllRating: ratingController.getAllRating
// });
// console.log("================================");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************
router.post("/createCourse", auth, isInstructor, courseController.createCourse);
router.get("/showAllCourse", courseController.showAllCourse);
router.post("/getCourseDetails", courseController.getCourseDetails);

// ********************************************************************************************************
//                                      Section routes (Instructor only)
// ********************************************************************************************************
router.post("/addSection", auth, isInstructor, sectionController.createSection);
router.post("/updateSection", auth, isInstructor, sectionController.updateSection);
router.post("/deleteSection", auth, isInstructor, sectionController.deleteSection);

// ********************************************************************************************************
//                                      Sub-Section routes (Instructor only)
// ********************************************************************************************************
router.post("/addSubSection", auth, isInstructor, subSectionController.createSubSection);
router.post("/updateSubSection", auth, isInstructor, subSectionController.updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, subSectionController.deleteSubSection);

// ********************************************************************************************************
//                                      Category routes (Admin only)
// ********************************************************************************************************
router.post("/createCategory", auth, isAdmin, categoryController.createCategory);
router.get("/showAllCategories", categoryController.showAllCategories);
router.post("/getCategoryPageDetails", categoryController.categoryPageDetails);

// ********************************************************************************************************
//                                      Rating & Review routes
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, ratingController.createRating);
router.get("/getAverageRating", ratingController.getAverageRating);
router.get("/getReviews", ratingController.getAllRating);

module.exports = router;
