import arg from "arg";
import MESSAGES from "../messages";

function getArgs(rawArgs) {
  let parsedArgs;
  try {
    parsedArgs = arg(
      {
        "--medium": Boolean,
        "--devto": Boolean,
        "--tumblr": Boolean,
        "--version": Boolean,
        "-v": "--version",
        "--title": String,
        "--content": String,
        "--csv": String,
        "--help": Boolean,
        "-h": "--help",
        "--arglist": Boolean,
      },
      {
        argv: rawArgs.slice(2),
      }
    );
  } catch (error) {
    const errorMessage = MESSAGES.errors[error.code];
    console.log(`${errorMessage}\n${MESSAGES.USAGE}`);
    process.exit();
  }

  return {
    medium: parsedArgs["--medium"] || false,
    devto: parsedArgs["--devto"] || false,
    tumblr: parsedArgs["--tumblr"] || false,
    title: parsedArgs["--title"] || null,
    content: parsedArgs["--content"] || null,
    csv: parsedArgs["--csv"] || null,
    help: parsedArgs["--help"] || null,
    showArgList: parsedArgs["--arglist"] || false,
  };
}

export default getArgs;
