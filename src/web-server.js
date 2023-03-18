const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { URLSearchParams } = require('url');
const fetch = require("node-fetch");
const cookieParser = require("cookie-parser");
const path = require("path");
const ejs = require("ejs");
const axios = require('axios').default;
const fs = require("fs");
const Twitter = require("./utils/twitter.js");
const twitter = new Twitter();
const Logger = require("./utils/Logger");
const logger = new Logger({ debug: true });



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function formatDate(date){
    return new Date(date).toLocaleString();
};

function findSpecialCharacters(string) {
  // Find anything that is not a letter or a number
  return string.replace(/[^a-zA-Z0-9]/g, "");
};

async function findUserData(req) {

  const userCookie = req.cookies.user;

  if (!userCookie) return null;

  const id = userCookie.id;

  if (!id) return null;

  const user = await userSchema.findOne({ userID: id });

  const options = {
    method: "GET",
    url: `https://discord.com/api/users/${id}`,
    headers: {
      Authorization: `Bot ${process.env.token}`,
      "Content-Type": "application/json",
    },
  };

  const res = await axios(options);

  const data = res.data;

  if (!user) return null;

  return data;
};

function webServer(client) {

    // * Home Handler
    app.get("/", async (req, res) => {
      res.redirect("/_?url=/home&title=Home");
    });

    app.get("/home", async (req, res) => {
        const owner = await client.users.fetch("547923574833545226");
        console.log(client.staff())
        res.render("home", { 
          client: client, 
          owner: owner,
          staff: client.staff(),
          showModals: false,
        });
    });

    // * Load Handler
    app.get("/_", async (req, res) => {
      url = req.query.url;
      if (!url) url = "/";
      res.render("misc/loader", {
        client: client,
        url: url,
        title: req.query.title,
      })
    });

    app.get("/socials/:i", async (req, res) => {
      const socurl = req.params.i;

      client.socials.forEach((soc) => {
        if (soc.name.toLowerCase() == socurl.toLowerCase()) {
          res.redirect(soc.url);
        }
      });
    })

    // * General Handler
    app.get("*", async (req, res) => {
        res.render("404", { client: client });
    })



    // * Server Listener
    app.listen(process.env.PORT || 3000, async () => {
        logger.log(`Started the web server on port ${process.env.PORT || 3000}!`, "Web Server");
    });
}


module.exports = webServer;