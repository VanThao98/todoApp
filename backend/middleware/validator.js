import { check } from "express-validator";

//user
export const register_valid = [
    check("name", "Name is required")
        .notEmpty()
        .trim().escape()
        .isLength({min:4}).withMessage('Name must be at least 4 characters long'),
    check("email", "Email is required")
        .notEmpty().withMessage("Email is not empty")
        .isEmail().withMessage("Email must be valid")
        .normalizeEmail(),
    check("password","Password is required")
        .notEmpty()
        .isLength({min:6}).withMessage("Password must be 6 or more character"),
    check("age", "Age is required").notEmpty().trim().escape()
        .isNumeric().withMessage("Age must be numeric")
        .isInt({min:5}).withMessage("Age must be 5 or more")
];

export const login_valid = [
    check("email", "Email is required")
        .notEmpty().withMessage("Email is not empty")
        .isEmail().withMessage("Email must be valid")
        .normalizeEmail(),
    check("password","Password is required")
        .notEmpty()
        .isLength({min:6}).withMessage("Password must be 6 or more character"),
];

export const updateDetail_valid =[
    check("name", "Name is required")
        .notEmpty()
        .trim().escape()
        .isLength({min:4}).withMessage('Name must be at least 4 characters long'),
    check("email", "Email is required")
        .notEmpty().withMessage("Email is not empty")
        .isEmail().withMessage("Email must be valid")
        .normalizeEmail(),
    check("age", "Age is required").notEmpty().trim().escape()
        .isNumeric().withMessage("Age must be numeric")
        .isInt({min:5}).withMessage("Age must be 5 or more")
];

export const updatePassword_valid = [
    check("password","Password is required")
        .notEmpty()
        .isLength({min:6}).withMessage("Password must be 6 or more character"),
    check("newPassword","New Password is required")
        .notEmpty()
        .isLength({min:6}).withMessage("New Password must be 6 or more character")
];

// todo
export const createTodo_valid = [
    check("title","title is required").notEmpty().trim().escape(),
    check("description", "description is required").notEmpty().trim().escape()
        .isLength({min:5}).withMessage('description must be getter than 5'),
    check('level', "level is required").notEmpty(),
    check('deadline', "deadline is required").notEmpty()
];
export const updateTodo_valid = [
    check("title","title is required").notEmpty().trim().escape(),
    check("description", "description is required").notEmpty().trim().escape()
        .isLength({min:5}).withMessage('description must be getter than 5'),
    check("completed", "completed is required").notEmpty().trim().escape()
        .isBoolean().withMessage("completed must be true or false"),
    check('level', "level is required").notEmpty(),
    check('deadline', "deadline is required").notEmpty()
]

// category
export const createCategory_valid = [
    check("categoryName","Category name is required").notEmpty().withMessage('Category name is not empty').trim().escape(),
    check("description", "Description is required").notEmpty().withMessage('Description is not empty').trim().escape()
];

export const updateCategory_valid = [
    check("categoryName","categoryName is required").notEmpty().trim().escape(),
    check("description", "description is required").notEmpty().trim().escape(),
]