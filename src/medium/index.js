import fs from "fs";
import Credentials from "../../credentials.json";
import axios from "axios";
import chalk from "chalk";
import { getCanonicalUrl } from "../helpers";
import MESSAGES from "../messages";
const csv = require("csv-parser");

const env = "DEV"; // DEV || PROD

const { domain, baseDomain, authorId, accessToken } =
  env === "DEV" ? Credentials.MediumPersonal : Credentials.Medium;

async function medium({ csvPath, title, content }) {
  if (!csvPath) {
    console.log(
      chalk.yellow(
        `Please provide a ${chalk.cyan("title and content")} or ${chalk.cyan(
          "relative path to csv"
        )} for the Medium post.`
      )
    );
    process.exit();
  }

  const payload = [];

  try {
    fs.statSync(csvPath).isFile();
  } catch (error) {
    console.log(MESSAGES.errors[error.code]);
    process.exit();
  }

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => {
      payload.push(data);
    })
    .on("end", async (data) => {
      try {
        payload.forEach(async (element) => {
          const postPayload = {
            title: element["Name"],
            contentFormat: "html",
            content: element["Post Body"],
            publishStatus: "draft",
            canonicalUrl: `${domain}/development/${element["Slug"]}?utm_source=medium&utm_campaign=crosspost`,
          };

          const res = await axios({
            url: `https://api.medium.com/v1/users/${authorId}/posts`,
            method: "post",
            json: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "content-type": "application/json",
            },
            data: JSON.stringify(postPayload),
          });

          console.log(
            chalk.green("Post uploaded successfully.\n") +
              `You can check post here - ${chalk.cyan(res.data.data.url)}.`
          );
        });
      } catch (error) {
        console.log(chalk.red(error));
        return;
      }
    });
}

export default medium;
