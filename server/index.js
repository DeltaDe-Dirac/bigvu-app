const path = require("path");
const express = require("express");
const https = require("https");

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

app.post("/test", (req, res) => {
  if (!req.body.url) {
    console.warn("missing url parameter! " + JSON.stringify(req.body));
  }
  const url = req.body.url;
  let data = "";

  try {
    https
      .get(url, (resp) => {
        // console.log("statusCode:", resp.statusCode);
        // console.log("headers:", resp.headers);
        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          // console.log(data);
          if (resp.statusCode === 200) {
            res.json(JSON.parse(data));
          } else {
            data = { message: `not a 200 status code at endpoint: ${url}`, statusCode: resp.statusCode };
            res.json(data);
          }
        });
      })
      .on("error", (e) => {
        console.error(e);
        data = { message: `[ASYNC] can't access endpoint: ${url}`, exception: e.message };
        res.json(data);
      });
  } catch (e) {
    console.error(e);
    data = { message: `[SYNC] can't access endpoint: ${url}`, exception: e.message };
    res.json(data);
  }
});

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
