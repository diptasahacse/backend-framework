import express from "express";
import apiRouter from "./routes";
// import './framework/lib/decorator/method'
// import './framework/lib/decorator/classDec'
// import './framework/lib/decorator/accessor'
// import './framework/lib/decorator/property'
import "./framework/lib/decorator/parameter";
const app = express();
const port = 5000;
app.use(express.json());
app.use("/api", apiRouter); // all modules under /api prefix

app.get("/", async (_req, res) => {
   res.status(200).json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}....`);
});
