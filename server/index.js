const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/lose", (req, res) => {
  res.json({ message: "You're never a loser until you quit trying" });
});

app.get("/win", (req, res) => {
  res.json({ message: "Sometimes you win and sometimes you learn" });
});

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Handle GET requests to /api route
app.get("/fetchAmount", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.post("/fetchAmount", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
