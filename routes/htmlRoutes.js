var db = require("../models");
const axios = require("axios");

module.exports = function (app) {
  // Load index page



  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json("example", {
        example: dbExample
      });
    });
  });


  app.post("/login", function (req, res) {
    db.User.findOne({
      where: {
        userName: req.body.username
      }
    }).then(function (result) {
      if (result != null) {
        console.log("logged in")
        //user found
        if (result.password === req.body.password) {
          req.session.loggedin = true;
          req.session.username = req.body.username;
          res.redirect("index2.html");
         }
         else{
          res.send(200,"wrong password");
      
         }

      } else {
        console.log("user does not exist")
        //user not found
        res.send("200", "user does not exist");

      }
    });
  });

  //---------------------------------------------//
  app.post("/logout", function (req, res) {
    req.session = null;
    res.send("logged out")
    });
    
  //---------------------------------------------//

  app.post("/signup", function (req, res) {
    db.User.findOne({
      where: {
        userName: req.body.username
      }
    }).then(function (result) {
      if (result != null) {
        console.log("result")
        //can't create 
        res.send("200", "user info taken");
      } else {
        console.log("null")
        //can create
        if (req.body.password === req.body.verify) {
          db.User.create({
            "userName": req.body.username,
            "email": req.body.email,
            "password": req.body.password
          })
          console.log("nice")
          res.send("200", "user created");
        } else {
          console.log("nope")
        }
      }
    });
  });


  app.post("/search", function (req, res) {
    search = 'https://api.yelp.com/v3/businesses/search?term=food&location=city';
    food = search.replace(/food/, req.body.query);
    location = food.replace(/city/, req.body.city);
    console.log(location);
    axios.get(location, {
      headers: {
        Authorization: "Bearer 0XmJFcySOehBbfOmxvf1H63RKMdvpEJsvTNpomcB9O4QnuuUkQbAh8Nxy9HZ88xfGJ3xOXuypueX1qjo4mdVJfmHioHkHfczT0b3evJAUkSBhqhinqHk1erdbNjrXXYx"
      }
    }).then((response) => {
      console.log(response.data.businesses);
    

      var h = "<html><body>INS</body></html>"
      var bud = "";

      for(var i=0; i<10; i++){
     
        bud += response.data.businesses[i].name
        bud += "<br>"
        bud += response.data.businesses[i].rating
        bud += "<br>"
        bud += response.data.businesses[i].location.address1
        bud += "<br>"
        bud += response.data.businesses[i].location.city
        bud += "<br>"
        bud += response.data.businesses[i].location.state
        bud += "<br>"
        bud += response.data.businesses[i].location.zip_code
        bud += "<br>"
        bud += "<img src='"+response.data.businesses[i].image_url+ "' height='150' width='150'/><br>";
        bud += "<br>" + "<br>"
       
        
      }
       

      

    

      res.send(bud);
      
    });



  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.json("404");
  });
};