const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//Get all users...
app.get("/api/users", (req, res) => {
  res.json(users);
});

//Get individual users with their id...
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const filterUser = users.find((eachUser) => {
    return eachUser.id == id;
  });
  res.send(filterUser);
});

//Create user through Post method..
app.post("/api/users", (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    users.push({ ...body, id: `${users.length + 1}` });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.status(200).json({
        success: true,
        massage: `Post request is successfull. id: ${users.length}`,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      massage: "Post request failed.",
    });
  }
});

//Update user..
app.patch("/api/users/update/:id",(req,res)=>{
  try {
    const body=req.body;
    const id=req.params.id;
    const newData={...body,id:id}
    const filterUser = users.find((eachUser) => {
      return eachUser.id == id;
    });
    const index= users.indexOf(filterUser);
    users.splice(index,1,newData);
   console.log(users)
    
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.status(200).json({
        success: true,
        massage: `Updated user is ${newData}`,
      });
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      massage:"Failed to updated the user",
    })
  }
})


//Delete users based on their id...
app.delete("/api/users/delete/:id", (req, res) => {
  try {
    const id = req.params.id;

    const filterUser = users.find((eachUser) => {
      return eachUser.id == id;
    });

   const index= users.indexOf(filterUser);
    const splicedArr=users.toSpliced(index,1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(splicedArr), (err, data) => {
      return res.status(200).json({
        success: true,
        massage: `Deleted user's id is ${id}`,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
        success:false,
        massage:"Couldn't delete the post.."
    })
  }
});


//Server started
app.listen(port, (req, res) => {
    console.log(`We are running at port number ${port}`);
  });