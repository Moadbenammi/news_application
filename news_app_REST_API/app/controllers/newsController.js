const db = require("../models");
const News = db.news;

//Create news
exports.create = (req, res) => {
    if (!req.body.title) {
      res.status(400).send({ message: "Content is empty!" });
      return;
    }
  
    const news = new News({
      title: req.body.title,
      body: req.body.body,
      imageUrl: req.body.imageUrl
    });
  
    // Save news in db
    news
      .save(news)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error while creating"
        });
      });
  };

  //Get news by id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    News.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "News with id: " + id + "not found." });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error while getting news with id=" + id });
      });
  };

  //Get all news
  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    News.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error while getting news."
        });
      });
  };

  

  //Update news 

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Content is empty!"
      });
    }
  
    const id = req.params.id;
  
    News.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update News with id=${id}. Does not exist!`
          });
        } else res.send({ message: "News was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating News with id=" + id
        });
      });
  };

   //Delete all news

   exports.deleteAll = (req, res) => {
    News.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} News were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error deleting all news."
        });
      });
  };

  //Delete news by id
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    News.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete News with id=${id}. Does not exist!`
          });
        } else {
          res.send({
            message: "News was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete News with id=" + id
        });
      });
  };

 
  