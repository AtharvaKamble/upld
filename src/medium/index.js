import fs from "fs";
import Credentials from "../../credentials.json";
import axios from "axios";
import chalk from "chalk";
const csv = require("csv-parser");

const { domain, authorId, accessToken } = Credentials.Medium;

async function medium({ csvPath, title, content }) {
  if (!csvPath) {
    console.log(
      chalk.yellow(
        "Please provide a title and content or relative path to csv for the Medium post."
      )
    );
    process.exit();
  }

  const payload = [];
  const oneTimePayload = {};

  fs.createReadStream("csv_data/RaftLabs_MainSite_Developments.csv")
    .pipe(csv())
    .on("data", (data) => {
      payload.push(data);
    })
    .on("end", async (data) => {
      oneTimePayload.title = payload[13]["Name"];
      oneTimePayload.body = payload[13]["Post Body"];
      oneTimePayload.slug = payload[13]["Slug"];
      oneTimePayload.canonicalUrl = `${domain}/development/${oneTimePayload.slug}?utm_source=medium&utm_campaign=crosspost`;

      const postData = {
        title: oneTimePayload.title,
        contentFormat: "html",
        content: oneTimePayload.body,
        publishStatus: "draft",
        canonicalUrl: oneTimePayload.canonicalUrl,
      };

      try {
        const res = await axios({
          url: `https://api.medium.com/v1/users/${authorId}/posts`,
          method: "post",
          json: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
          },
          data: JSON.stringify(postData),
        });

        console.log(
          chalk.green("Post uploaded successfully.\n") +
            `You can check post here - ${chalk.cyan(res.data.data.url)}.`
        );
      } catch (error) {
        console.log(chalk.red(error));
        return;
      }
    });
}

export default medium;
