const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const { tourId } = req.params;
    const { query } = req;

    // To allow for nested GET reviews on tour (hack)
    let filter;
    if (tourId) filter = { tour: tourId };

    const features = new APIFeatures(Model.find(filter), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const doc = await features.query.explain();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: { data: doc }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError(`No document found with ID: ${id}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: doc }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return next(new AppError(`No document found with ID: ${id}`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const { body } = req;

    const newDoc = await Model.create(body);

    res.status(201).json({
      status: 'success',
      data: { data: newDoc }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    const doc = await Model.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError(`No document found with ID: ${id}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
