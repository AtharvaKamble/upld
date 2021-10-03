import Credentials from "../../credentials.json";
import axios from "axios";

const { api_key, prod_server } = Credentials.devto;

export default async function devto({ csvPath, title, content }) {
  const blog = {
    article: {
      title: "Hello this is done programmatically! Part B",
      published: false,
      body_markdown:
        "<h4>Hey this is from the Nodejs</h4><i>This text is Italic</i>",
      tags: ["first", "post"],
    },
  };

  //   const res = await axios({
  //     url: `${prod_server}/articles`,
  //     method: "post",
  //     json: true,
  //     headers: {
  //       "api-key": api_key,
  //       "content-type": "application/json",
  //     },
  //     data: JSON.stringify(blog),
  //   });
  let thirtySecondsCounter = 0;
  setInterval(function () {
    if (thirtySecondsCounter >= 10) {
      return clearInterval(this);
    }

    i++;
    console.log(`${minutes} ${i}`);
  }, 28000);
}
