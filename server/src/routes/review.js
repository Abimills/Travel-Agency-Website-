import express from "express";
import {
  createReview,
  getReviews,
  getCityByQuery,
  getReviewById,
  sortReviews,
  updateReview,
  getByReviewIds,
  getByUserName,
  reviewQueryByAddress,
} from "../controllers/review.js";
import { verifyToken } from "../middleware/verifyToken.js";

const reviewRouter = express.Router();
// create a review
reviewRouter.post("/createReview", verifyToken, createReview);
// add comment or like to review
reviewRouter.put("/update/:id", verifyToken, updateReview);
// get all reviews
reviewRouter.get("/", getReviews);
// get review by query
reviewRouter.get("/query", getCityByQuery);
// get review by search of place name
reviewRouter.post("/reviewbyAddress", reviewQueryByAddress);
// get single review by review id
reviewRouter.get("/find/:id", getReviewById);
// get muliple reviews by multiple review ids
reviewRouter.post("/getByUserFav", getByReviewIds);
// get reviews sort decending order by score value
reviewRouter.get("/sort", sortReviews);
//get all reviews a user have
reviewRouter.post("/findBy/userId", getByUserName);

export default reviewRouter;
