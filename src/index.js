"use-strict";
const http = require("node:http");
const urlService = require("./services/index.js");

const requestListener = async function (req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "POST" && req.url === "/encode") {
    const host = req.headers.host;
    let data = "";

    req.on("data", (dataChucks) => {
      data += dataChucks.toString();
    });

    req.on("end", async () => {
      const requestData = JSON.parse(data);
      const { originalUrl } = requestData;

      if (!originalUrl) {
        res.writeHead(400);
        return res.end(
          JSON.stringify({ error: "Long or Original URL is required" })
        );
      }

      try {
        const shortenedUrl = await urlService.shortenOriginalUrl(
          requestData,
          host
        );
        res.writeHead(201);
        return res.end(JSON.stringify({ shortUrl: shortenedUrl }));
      } catch (error) {
        // Handle Error
        console.log(error);

        res.writeHead(500);
        return res.end(
          JSON.stringify({
            error: "Could not shorten url, something went wrong",
          })
        );
      }
    });
  } else if (req.method === "POST" && req.url === "/decode") {
    let data = "";
    req.on("data", (dataChucks) => {
      data += dataChucks.toString();
    });

    req.on("end", async () => {
      const requestData = JSON.parse(data);

      const { shortUrl } = requestData;

      if (!shortUrl) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "short url is required" }));
      }

      try {
        const originalUrl = await urlService.getOriginalUrl(requestData);

        res.writeHead(200);
        return res.end(JSON.stringify({ originalUrl: originalUrl }));
      } catch (error) {
        if (error.message === "Url not found") {
          res.writeHead(400);
          return res.end(JSON.stringify({ message: "Invalid Short url" }));
        }

        // Handle Error
        console.log(error);

        res.writeHead(500);
        return res.end(
          JSON.stringify({
            error: "Could not get original url, something went wrong",
          })
        );
      }
    });
  } else {
    return res.end(JSON.stringify({ message: "Invalid Request" }));
  }
};

const server = http.createServer(requestListener);
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
