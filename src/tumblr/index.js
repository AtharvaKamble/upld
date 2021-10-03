import TClient from "tumblr.js";
import Credentials from "../../credentials.json";
import chalk from "chalk";
import MESSAGES from "../messages";
import fs from "fs";
const csv = require("csv-parser");

const {
  OAuth_consumer_key,
  OAuth_consumer_secret,
  token,
  token_secret,
  blogIdentifier,
} = Credentials.TumblrPersonal;

async function tumblr({ csvPath, title, content }) {
  if (!csvPath) {
    console.log(
      chalk.yellow(
        `Please provide a ${chalk.cyan("title and content")} or ${chalk.cyan(
          "relative path to csv"
        )} for the Tumblr post.`
      )
    );
    process.exit();
  }

  try {
    fs.statSync(csvPath).isFile();
  } catch (error) {
    console.log(MESSAGES.errors[error.code]);
    process.exit();
  }

  const client = await TClient.createClient({
    credentials: {
      consumer_key: OAuth_consumer_key,
      consumer_secret: OAuth_consumer_secret,
      token: token,
      token_secret: token_secret,
    },
    returnPromises: true,
  });

  const payload = [];

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => {
      payload.push(data);
    })
    .on("end", async (data) => {
      try {
        payload.forEach(async (element) => {
          const postPayload = {
            format: "html",
            body: element["Post Body"],
            state: "draft",
            slug: element["Slug"],
          };

          const res = await client.createTextPost(blogIdentifier, postPayload);

          if (res.id) {
            console.log(
              chalk.yellow(
                "--------------------------------------------------------------"
              )
            );
            console.log(
              `Important details\nCurrent Name - ${chalk.cyan(
                element["Name"]
              )}\nCanonical - ${element["Canonical Url"]}`
            );
            console.log(
              chalk.yellow(
                "--------------------------------------------------------------"
              )
            );
          }
        });
      } catch (error) {
        console.log(chalk.red(error));
        return;
      }
    });
}

export default tumblr;
