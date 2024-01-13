import express from "express";
import cors from "cors";
import userModel from "./models/products.js";
import mongoose from "mongoose";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shopify");

app.post("/submit", (req, res) => {
  const user = new userModel(req.body);
  user
    .save()
    .then((el) => res.json(el))
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
});

app.get("/", (req, res) => {
  const { employ, status, fromDate, toDate, availableStatus } = req.query;
  let query = {};

  if (employ) {
    query.$or = [
      { empName:{$regex: employ, $options: "i"}  },
      { empId: parseInt(employ) ? parseInt(employ) : 0 },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (fromDate && toDate) {
    query.date = { $gt: fromDate, $lt: toDate };
  }
  // console.log(availableStatus+"fbjwbjf")
if(availableStatus==="Available"){
  query.quantity={ $gt: 0 } 
}
if(availableStatus==="Out of Stock"){
  query.quantity={$eq:0} 
}
  userModel
    .find(query)
    .then((products) => {
      // console.log(products);

      res.json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
app.get("/getproduct/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send(err));
  // console.log(err + "iefgjeh")
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body)
  if(typeof req.body.empId !== "number" || typeof req.body.quantity !== "number") return res.status(400).send({
    message: "Employe Id and quantity should be number"
  })

  userModel
    .findByIdAndUpdate(id, {
      empId: req.body.empId,
      empName: req.body.empName,
      quantity: req.body.quantity,
      status: req.body.status,
      date: req.body.date,
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).send({
      message: err.message
    }));
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.listen(port, (req, res) => {
  console.log("server is running on port" + port);
});
