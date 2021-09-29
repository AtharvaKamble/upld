const fs = require("fs");
import Credentials from "../../credentials.json";
const csv = require("csv-parser");
import axios from "axios";

const { authorId, accessToken } = Credentials.medium;

async function medium({ csvPath, title, content }) {
  if (!csvPath) {
    console.log("Please provide a title and content for the Medium post.");
    process.exit();
  }

  const payload = [];
  const oneTimePayload = {};

  fs.createReadStream("csv_data/RaftLabs_MainSite_Developments.csv")
    .pipe(csv())
    .on("data", (data) => {
      payload.push(data);
    })
    .on("end", (data) => {
      oneTimePayload.title = payload[0]["Name"];
      oneTimePayload.body = payload[0]["Post Body"];

      const postData = {
        title: oneTimePayload.title,
        contentFormat: "html",
        content: oneTimePayload.body,
        publishStatus: "draft",
      };

      console.log(postData);
      axios(
        {
          url: `https://api.medium.com/v1/users/${authorId}/posts`,
          method: "post",
          json: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
          },
          data: JSON.stringify(postData),
        },
        (error, response, body) => {
          console.log(response);
        }
      );
    });
}

export default medium;
