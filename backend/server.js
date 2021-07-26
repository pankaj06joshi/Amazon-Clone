import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import data from "./data";
import config from "./config";
import userRouter from "./routers/userRouter";

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to mongodb.");
  })
  .catch((error) => {
    console.log(error.reason);
  });
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use("/api/users", userRouter);
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found..!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server start at http://localhost:${PORT}`);
});
