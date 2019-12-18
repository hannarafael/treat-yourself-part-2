var db = require("../models");


module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Get one user (to do)
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {id: req.params.id},
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
 

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};



