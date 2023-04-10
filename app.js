const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // here public is folder name but we can named it any to show our css and other file

app.get("/",function(req,res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    
    var data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };

    const jsonData =JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/f63f1041b4";

    const options = {
        method:"POST",
        auth: "amit1:de4a3fd12f3f50293baef94f6763cb4d-us13"
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on 3000...");
});


//API Key
//53ff70a74beb8b0c201b513925190ac4-us13

// Audience ID
//  f63f1041b4
