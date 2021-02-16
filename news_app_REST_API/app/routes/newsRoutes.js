module.exports = app => {
    const news = require("../controllers/newsController.js");
  
    var router = require("express").Router();
  
    // Create news
    router.post("/", news.create);

     // Get news by id
     router.get("/:id", news.findOne);
  
    // Get all news
    router.get("/", news.findAll);
  
    // Update news by id
    router.put("/:id", news.update);
  
    // Delete news by id
    router.delete("/:id", news.delete);
  
    // Delete all news
    router.delete("/", news.deleteAll);
  
    app.use('/api/news', router);
  };