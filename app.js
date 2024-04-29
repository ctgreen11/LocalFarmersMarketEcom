const mysql = require('mysql');
const express = require('express');

var app = express();


app.set("view engine","ejs");

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

const con = mysql.createConnection({
    host: 'localhost',
    user:'root',
    database:'FarmersmarketEcomm'
});

con.connect((err) => {
    if(err) throw err;
    console.log("Database connected");
});

app.get("/search", function(req, res) {
    res.render("Search");
    });

    app.get("/Usersearch", function(req, res) {
        res.render("User_Search");
        });

app.get("/delete", function(req,res) {
    var q = "select * from Farmer";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("Delete_Farmer", { data: results });
    })
});

app.get("/Userdelete", function(req,res) {
    var q = "select * from Users";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("Delete_User", { data: results });
    })
});

app.get("/update", function(req,res) {
    var q = "select * from Farmer";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("UpdateFarmer", { data: results });
    })
});

app.get("/Userupdate", function(req,res) {
    var q = "select * from Users";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("UpdateUser", { data: results });
    })
});

app.post("/register_farmer", function(req, res) {
    var Farmer_info = { Name: req.body.std_name, Password: req.body.std_password, Email: req.body.std_email};
    var q = "insert into Farmer set ?";
    con.query(q, Farmer_info, function(error, results) {
    if (error) throw error;
    res.redirect("http://127.0.0.1:5500/public/landingPage.html"); //redirect to root page
    });
});

app.post("/register_produce", function(req, res) {
    var Produce_info = { ProductID: req.body.std_productid, FarmerID: req.body.std_farmerid, Name: req.body.std_name, Price: req.body.std_price, Category: req.body.std_category};
    var q = "insert into Products set ?";
    con.query(q, Produce_info, function(error, results) {
    if (error) throw error;
    res.redirect("/displayproduce"), { data: results }; //redirect to root page
    });
});

app.get("/displayproduce", function(req, res) {
    var q = "select * from Products";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("Produce_Results", { data: results });
    });
});

app.get("/displayFruit", function(req, res) {
    var q = "select * from Products where category = 'Fruit'";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("FruitsFilter", { data: results });
    });
});

app.get("/displayGrain", function(req, res) {
    var q = "select * from Products where category = 'Grain'";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("GrainFilter", { data: results });
    });
});

app.get("/displayVeg", function(req, res) {
    var q = "select * from Products where category = 'Vegetable'";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("VegFilter", { data: results });
    });
});

app.get("/displayFarmers", function(req, res) {
    var q = "select * from Farmer";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("Produce_insert", { data: results });
    });
});

app.get("/displayAllFarmers", function(req, res) {
    var q = "select * from Farmer";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("DisplayAllFarmers", { data: results });
    });
});

app.get("/displayAllUsers", function(req, res) {
    var q = "select * from Users";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("DisplayAllUsers", { data: results });
    });
});

app.get("/db", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM Farmer';
    con.query(q, function (error, results) {
    if (error) throw error;
    var count = results[0].count;
    res.render("Farmer_insert", {data : count});
    });//query
});//get


app.get("/dbuser", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM Users';
    con.query(q, function (error, results) {
    if (error) throw error;
    var count = results[0].count;
    res.render("User_insert", {data : count});
    });//query
});//get


app.post("/register_user", function(req, res) {
    var User_info = { Name: req.body.std_name, Password: req.body.std_password, Email: req.body.std_email};
    var q = "insert into Users set ?";
    con.query(q, User_info, function(error, results) {
    if (error) throw error;
    res.redirect("http://127.0.0.1:5500/public/landingPage.html"); //redirect to root page
    });
});

app.post("/delete", function(req, res) {
    var farmerID = req.body.std_farmerID;
    var q = "DELETE FROM Farmer WHERE FarmerID = ?";
    con.query(q, farmerID, function(error, results) {
        if (error) throw error;
        else {
        if (results.affectedRows === 0) 
        res.send("No Farmer found with FarmerID: " + farmerID);
        else
            res.redirect('back'); 
        }
    });
});

app.post("/Userdelete", function(req, res) {
    var userID = req.body.std_userID;
    var q = "DELETE FROM Users WHERE UserID = ?";
    con.query(q, userID, function(error, results) {
        if (error) throw error;
        else {
        if (results.affectedRows === 0) 
        res.send("No Farmer found with FarmerID: " + userID);
        else
            res.redirect('back'); 
        }
    });
});

app.post("/update", function(req, res) {
    var Farmer_info = { FarmerID: req.body.std_farmerID, Name: req.body.std_name, Password: req.body.std_password, Email: req.body.std_email};
    var q = "update Farmer set Name=?, Password=?, Email=? where FarmerID=?";
    con.query(q, [Farmer_info.Name, Farmer_info.Password, Farmer_info.Email, Farmer_info.FarmerID], function(error, results) {
        if (error) throw error;
        else {
        if (results.affectedRows === 0) 
        res.send("No Farmer found with FarmerID: " + Farmer_info.std_farmerID);
        else
            res.redirect('back'); 
        }
    });
});

app.post("/Userupdate", function(req, res) {
    var User_info = { UserID: req.body.std_userID, Name: req.body.std_name, Password: req.body.std_password, Email: req.body.std_email};
    var q = "update Users set Name=?, Password=?, Email=? where userID=?";
    con.query(q, [User_info.Name, User_info.Password, User_info.Email, User_info.UserID], function(error, results) {
        if (error) throw error;
        else {
        if (results.affectedRows === 0) 
        res.send("No Farmer found with FarmerID: " + User_info.std_userID);
        else
            res.redirect('back'); 
        }
    });
});

app.post("/search", function(req, res) {
        var FarmerID = req.body.std_farmerID;
        var q = "select FarmerID, Name, Email from Farmer where FarmerID = ?";
        con.query(q, [FarmerID], function(error, results) {
        if (error) throw error;
        else
        res.render("Search_result", { data: results[0], count: results.length });
        });
     });

     app.post("/Usersearch", function(req, res) {
        var UserID = req.body.std_userID;
        var q = "select UserID, Name, Email from Users where UserID = ?";
        con.query(q, [UserID], function(error, results) {
        if (error) throw error;
        else
        res.render("UserSearch_results", { data: results[0], count: results.length });
        });
     });


app.listen(8080, function () {
    console.log('App listening on port 8080!');
    });