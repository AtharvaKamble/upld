import arg from "arg";

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
      },
      {
        argv: rawArgs.slice(2),
      }
    );
  } catch (e) {
    const error =
      e.code === "ARG_UNKNOWN_OPTION" ? "Error: Unknown argument." : null;
    console.log(`${error}\nUsage: upld [--blog_site] [--title] [--content]`);
    return { error };
  }

  return {
    medium: parsedArgs["--medium"] || false,
    devto: parsedArgs["--devto"] || false,
    tumblr: parsedArgs["--tumblr"] || false,
    title: parsedArgs["--title"] || null,
    content: parsedArgs["--content"] || null,
    csv: parsedArgs["--csv"] || null,
  };
}

export default getArgs;
