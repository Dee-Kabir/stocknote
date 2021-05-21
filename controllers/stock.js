const Stock = require("../models/stock");
const formidable = require("formidable");
const fs = require("fs");
const User = require("../models/user");
const _ = require("lodash");

exports.create = async (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  try {
    form.parse(req, (err, fields, files) => {
      console.log(fields);
      if (err) {
        return res.status(400).json({
          error: "Try Again",
        });
      }

      let stock = new Stock(fields);
      let arrayofResistance =
        fields.resistanceLevels && fields.resistanceLevels.split(",");
      let arrayofSupport =
        fields.supportLevels && fields.supportLevels.split(",");
      stock.resistanceLevels = arrayofResistance;
      stock.supportLevels = arrayofSupport;
      stock.postedBy = req.user._id;
      if (files.dailyShot) {
        stock.dailyShot.data = fs.readFileSync(files.dailyShot.path);
        stock.dailyShot.contentType = files.dailyShot.type;
      }
      if (files.weeklyShot) {
        stock.weeklyShot.data = fs.readFileSync(files.weeklyShot.path);
        stock.weeklyShot.contentType = files.weeklyShot.type;
      }
      stock.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { stocks: result },
          },
          {
            new: true,
          }
        ).exec();
        console.log(result);
        res.json({
          message: "Added Successfully",
        });
      });
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
exports.getstockslist = async (req, res) => {
  User.findById(req.user._id)
    .populate("stocks", "name cmp updatedAt _id title")
    .select("stocks")
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Try Again!!",
        });
      } else {
        res.json(data);
      }
    });
  // Stock.find({postedBy: req.user._id})
  // .select('name cmp updatedAt')
  // .exec((error,data) => {
  //   if(error){
  //     return res.status(400).json({
  //       error: "Try Again!!"
  //     })
  //   }else{
  //     res.json(data);
  //   }
  // })
};
exports.searchList = async (req, res) => {
  User.findById(req.user._id)
    .populate("stocks", "_id title")
    .select("stocks")
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Try Again!!",
        });
      } else {
        res.json(data);
      }
    });
};
exports.read = (req, res) => {
  Stock.findById(req.params.id)
    .select("-dailyShot.data")
    .select("-weeklyShot.data")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "Please Try Again!!",
        });
      } else {
        res.json(result);
      }
    });
};
exports.photow = (req, res) => {
  Stock.findById(req.params.id)
    .select("weeklyShot")
    .exec((err, result) => {
      if (err || !result) {
        return res.status(400).json({
          error: err,
        });
      }
      res.set("Content-Type", result.weeklyShot.contentType);
      return res.send(result.weeklyShot.data);
    });
};
exports.photod = (req, res) => {
  Stock.findById(req.params.id)
    .select("dailyShot")
    .exec((err, result) => {
      if (err || !result) {
        return res.status(400).json({
          error: err,
        });
      }
      res.set("Content-Type", result.dailyShot.contentType);
      return res.send(result.dailyShot.data);
    });
};
exports.update = async (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status({
        error: "Try Again!! After sometime",
      });
    }
    // console.log(fields)
    if (req.user._id !== fields.postedBy) {
      return res.status(400).json({
        error: "You can't edit this Hotel",
      });
    } else {
      Stock.findById(req.params.id).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: "Try Again!!!",
          });
        }
        // console.log(result)
        let stock = result;
        // console.log(hotel)
        stock = _.merge(stock, fields);
        let arrayofResistance =
        fields.resistanceLevels && fields.resistanceLevels.split(",");
      let arrayofSupport =
        fields.supportLevels && fields.supportLevels.split(",");
      if(arrayofResistance){
        stock.resistanceLevels = arrayofResistance;
      }
      if(arrayofSupport){
        stock.supportLevels = arrayofSupport;
      }
        if (files.weeklyShot) {
          stock.weeklyShot.contentType = files.weeklyShot.type;
          stock.weeklyShot.data = fs.readFileSync(files.weeklyShot.path);
        }
        if (files.dailyShot) {
          stock.dailyShot.contentType = files.dailyShot.type;
          stock.dailyShot.data = fs.readFileSync(files.dailyShot.path);
        }
        Stock.findByIdAndUpdate(stock._id, stock, { new: true }).exec(
          (err, updatedStock) => {
            if (err) {
              return res.status(400).json({
                error: "Try Again!!!",
              });
            }
            // console.log(newHotel)
            res.json({
              message: "Updated Successfully",
            });
          }
        );
      });
    }
  });
};
exports.removestock = async (req,res) => {
  Stock.findByIdAndRemove(req.params.id).exec((error,data) => {
    if(error){
        return res.status(400).json({
            error: error
        })
    }
    User.findById(req.user._id)
    .populate("stocks", "name cmp updatedAt _id title")
    .select("stocks")
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Try Again!!",
        });
      } else {
        res.json(data);
      }
    });
})
}