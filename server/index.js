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

app.post("/callExApi", (req, res) => {
  if (!req.body.url) {
    console.warn("missing url parameter! " + JSON.stringify(req.body));
  }
  const url = req.body.url;
  let data = "";

  try {
    https
      .get(url, (resp) => {
        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
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

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
