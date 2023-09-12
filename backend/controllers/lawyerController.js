const Lawyer = require("../models/lawyerModel");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product ------> Admin

exports.createLawyer = CatchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const lawyer = await Lawyer.create(req.body);

  res.status(201).json({
    success: true,
    lawyer,
  });
});

// Get All Products

exports.getAllLawyers = CatchAsyncErrors(async (req, res) => {
  let resultPerPage = 4;
  const lawyerCount = await Lawyer.countDocuments();

  const apiFeature = new ApiFeatures(Lawyer.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const lawyer = await apiFeature.query;

  res.status(200).json({
    success: true,
    lawyerCount: lawyerCount,
    lawyer,
  });
});

// Product Details

exports.getLawyerDetails = CatchAsyncErrors(async (req, res, next) => {
  const lawyer = await Lawyer.findById(req.params.id);

  if (!lawyer) {
    return next(new ErrorHandler("Lawyer not found!!", 404));
  }

  res.status(200).json({
    success: true,
    lawyer,
  });
});

// Update Product ------> Admin

exports.updateLawyer = CatchAsyncErrors(async (req, res, next) => {
  let lawyer = await Lawyer.findById(req.params.id);

  if (!lawyer) {
    return next(new ErrorHandler("Lawyer not found!!", 404));
  }

  lawyer = await Lawyer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Lawyer Updated",
  });
});

// Delete Product ------> Admin

exports.deleteLawyer = CatchAsyncErrors(async (req, res, next) => {
  const lawyer = await Product.findById(req.params.id);

  if (!lawyer) {
    return next(new ErrorHandler("Lawyer not found!!", 404));
  }

  await lawyer.deleteOne();

  res.status(200).json({
    success: true,
    message: "Lawyer Deleted",
  });
});
