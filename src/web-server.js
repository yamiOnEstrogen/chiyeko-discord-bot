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

  return data;
};

function webServer(client) {

    // * Home Handler
    app.get("/", async (req, res) => {
      res.redirect("/home");
    });

    app.get("/home", async (req, res) => {
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

    app.get("/invite", async (req, res) => {
      res.redirect(`https://discord.gg/RyzuKecPX8`);
    })

    app.get("/donate", async (req, res) => {
      if (!req.cookies.user) return res.redirect("/_?url=/login&title=Login");

      const down = true;

      if (down) return res.send("Sorry but the donation system is currently down. Please try again later.")
      

      res.render("misc/donate", {
        client: client,
        user: await findUserData(req) || null,
      })
    })

    app.get("/socials/:i", async (req, res) => {
      const socurl = req.params.i;

      client.socials.forEach((soc) => {
        if (soc.name.toLowerCase() == socurl.toLowerCase()) {
          res.redirect(soc.url);
        }
      });
    });

    app.get("/login", async (req, res) => {
      res.redirect(`${process.env.redirect_uri}`);
    })


     // * OAuth Handler (Discord)
     app.get("/oauth", async (req, res) => {
      const data_1 = new URLSearchParams();
      data_1.append('client_id', "1077684781774557233");
      data_1.append('client_secret', `${process.env.secret}`);
      data_1.append('grant_type', 'authorization_code');
      data_1.append('redirect_uri', `${process.env.redirect_uri}`);
      data_1.append('scope', 'identify, email');
      data_1.append('code', req.query.code);

      fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1 }).then(response => response.json()).then(data => {
          const options = {
              method: 'GET',
              url: 'https://discord.com/api/users/@me',
              headers: {
                  'Authorization': `Bearer ${data.access_token}`
              }
          }

         axios
                  .get(options.url, { headers: options.headers })
                  .then(async (response) => {
                      const data = response.data;

                      res.cookie("user", data, {
                          maxAge: 1000 * 60 * 60 * 24 * 30,
                          httpOnly: true,
                      });


                     return res.redirect("/");



                  })
                  .catch((err) => {
                      console.log(err);
                  });
          });
    });

	//* Paypal Api
    app.post('/api/paypal', async (req, res) => {
      const data = req.body;
      console.log(req.headers["authorization"]);
      
      if (!req.headers["authorization"]) return res.json({ error: "No Authorization Header" });

      console.log(data)

      // Check if the payment is valid
      if (data.status !== "COMPLETED") return res.json({ error: "Payment not completed" });

      const amount = data.purchase_units[0].amount.value;
      const currency = data.purchase_units[0].amount.currency_code;
      const email = data.payer.email_address;

      if (amount > 300) return res.json({ error: "Payment too high (Only up to $300 USD)" });
      
      try {
        client.donate(req.headers["authorization"], amount, currency, email)
        return res.json({ success: "Payment successful" });
      }
      catch (err) {
        console.log(err)
        return res.json({ error: `Payment failed something went wrong :: ${err}` });
      }


    })
  



    // * Server Listener
    app.listen(process.env.PORT || 3000, async () => {
        logger.log(`Started the web server on port ${process.env.PORT || 3000}!`, "Web Server");
    });
}


module.exports = webServer;