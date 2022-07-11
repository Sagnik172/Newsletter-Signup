const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));//accessing local files wrt public folder
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status: "subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME:lastName
        }


      }
    ]
  }
  const url=" https://us13.api.mailchimp.com/3.0/lists/38f514a655"
  const jsonData=JSON.stringify(data);

  const options={
    method:"POST",
    auth:"Sagnik_:a0fd6df28f2f5bd95232ba91cbd9296f-us13"
  }
  const request=https.request(url, options, function(response){

    if(response.statusCode===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else
    {
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req,res){
  res.redirect("/");

})


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
})
//api key-680ef31172b3c3c11c1bda7a75a78568-us8
//list id=3d0c0b1169
