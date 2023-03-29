import { request, response } from "express";
import { validationResult } from "express-validator";
export const checkForError = (req = request, res = response, next) => {
  const errors = validationResult(req).array();
  console.log(errors);
  if (errors.length >= 1) {
    return res.status(400).json({
      error: errors,
    });
  }
  next();
};
