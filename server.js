// const { log } = require("console")
// const http = require("http")

// const server = http.createServer((req,res) => {

//     if (req.url === "/") {
//         res.end("Home pagge")
//     }else if (req.url === "/about") {
//         res.end("About page")
//     }
// })

// server.listen(5000, () => {
//     console.log("server is running...");

// })

const express = require("express");

const app = express();

app.use(express.json());

let users = [
  {
    id: 1,
    name: "rabeeh",
    age: 45,
    email: "rabeeh@gmail.com",
  },
  {
    id: 2,
    name: "safvan",
    age: 69,
    email: "safvan@gmail.com",
  },
  {
    id: 3,
    name: "shakira",
    age: 70,
    email: "shakira@gmail.com",
  },
];

// app.get("/about", (req,res) => {
//     res.json({name:"rabeeh",age:34,email:"Rabeehck1@gmail.com"})
// })

// app.post("/login", (req,res)=> {
//     console.log(req.body);
//     res.json(req.body)
// })

// create / POST

app.post("/user/create", (req, res) => {
  users.push({ ...req.body, id: users.length + 1 });
  res.send(users);
});

// Read / GET

app.get("/user/read", (req, res) => {
  res.send(users);
});

// UPDATE / PUT

app.put("/user/update/:userId", (req, res) => {
  const userId = req.params.userId;
  const { name, age, email } = req.body;
  users = users.map((user) => {
    if (user.id === Number(userId)) {
      user.name = name ? name : user.name;
      user.age = age ? age : user.age;
      user.email = email ? email : user.email;
    }
    return user;
  });
  res.send(users);
});

// DELETE

app.delete("/user/delete/:userId", (req,res) => {
    const userId = req.params.userId

    users = users.filter((user) => user.id !== Number(userId))
    res.send(users)
});

app.get("/user/:userId", (req,res) => {
    const userId = req.params.userId
    const user = users.find((user) => user.id === Number(userId))
    if (!user) {
       return res.send("User not found")  
    }
    res.send(user)
})

app.listen(5000, () => {
  console.log("server is running...");
});
