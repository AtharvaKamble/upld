import TClient from "tumblr.js";
import Credentials from "../../credentials.json";

const { OAuth_consumer_key, OAuth_consumer_secret, token, token_secret } =
  Credentials.Tumblr;

function tumblr({ csvPath, title, content }) {
  const client = tumblr.createClient({
    consumer_key: OAuth_consumer_key,
    consumer_secret: OAuth_consumer_secret,
    token: token,
    token_secret: token_secret,
  });
}

export default tumblr;
