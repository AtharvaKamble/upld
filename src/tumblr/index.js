import TClient from "tumblr.js";
import Credentials from "../../credentials.json";

const {
  OAuth_consumer_key,
  OAuth_consumer_secret,
  token,
  token_secret,
  blogIdentifier,
} = Credentials.Tumblr;

async function tumblr({ csvPath, title, content }) {
  const client = await TClient.createClient({
    credentials: {
      consumer_key: OAuth_consumer_key,
      consumer_secret: OAuth_consumer_secret,
      token: token,
      token_secret: token_secret,
    },
    returnPromises: true,
  });

  const blogDetails = {
    title: "Hello from Node.js, Part B",
    body: "<h1>This is done programmatically, yooohooo!</h1>",
    state: "draft",
    source: "https://raftlabs.co",
  };

  const res = await client.createTextPost(blogIdentifier, blogDetails);

  if (res.id) {
    console.log(res);
  }
}

export default tumblr;
