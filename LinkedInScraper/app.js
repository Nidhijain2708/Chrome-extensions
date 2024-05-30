const express = require('express');
const path = require('path');
const app = express();
const PORT = 4444;
const hbs = require('hbs');
const sequelize = require('./connection/database');
const puppeteer = require('puppeteer');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

require('dotenv').config;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/linkhandle', async (req, res, next) => {
  const { linkArr } = req.body;
  try {
    const promises = linkArr.map(async (l) => {
      const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
      const page = await browser.newPage();
      // await page.goto('https://in.linkedin.com/in/kajal-sharma-9b561216b/');
      await page.goto(l);
      await page.waitForNavigation({ waitUntil: "networkidle0" });

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
      );
      await page.setViewport({ width: 1200, height: 1200 });

      try {
        const name = await page.$$eval(
          "h1.top-card-layout__title",
          (elements) => elements.map((element) => element.textContent)
        );

        console.log(name);
        const followerConnectionLocation = await page.$$eval(
          "div.not-first-middot span",
          (elements) => elements.map((element) => element.textContent)
        );

        console.log(followerConnectionLocation);

        // // original_referer=
        // const about=await page.$$eval(
        //   "section.profile:nth-child(1) section.core-section-container div.core-section-container__content div",
        //   (elements)=>elements.map((element)=>element.textContent)
        // );

        // console.log(about);

        const bio = await page.$$eval(
          "h2.top-card-layout__headline",
          (elements) => elements.map((element) => element.textContent)
        );

        console.log(bio);

        const about = await page.$$eval(
          "section.pp-section div.core-section-container__content p",
          (elements) => elements.map((element) => element.textContent)
        );

        console.log(about);

        const url = await page.url();

        res.send({
          name,
          followerConnectionLocation,
          bio,
          url,
          about
        });

        // await browser.close();
      }
      catch (err) {
        console.log(err);
      }
    });
    await Promise.all(promises);
    res.status(200).send('Scraping completed');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error scraping links');
  }
});

app.post('/dataHandle', (req, res, next) => {
  console.log("Database mei add kar dete hai");
  let { name, bio, location, followers, connections, about, url } = req.body;
  userData.create({
    name: name,
    bio: bio,
    location: location,
    followers: followers,
    connections: connections,
    about: about,
    url: url
  })
    .then((result) => {
      console.log(result);
    })
    .catch(err => console.log(err));
})

app.listen(PORT, () => {
  console.log(`http://localhost:` + PORT);
})