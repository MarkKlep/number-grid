import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/reg-user", (req, res) => {
  console.log(req.body);
  res.status(201).send("User registered successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
