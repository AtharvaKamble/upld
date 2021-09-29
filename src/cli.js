import medium from "./medium";
import getArgs from "./parser";
import chalk from "chalk";

export async function cli(rawArgs) {
  const args = getArgs(rawArgs);

  if (args.medium === true) {
    await medium({
      csvPath: args.csv,
      title: args.title,
      content: args.content,
    });
  } else if (args.tumblr === true) {
    await tumblr({
      csvPath: args.csv,
      title: args.title,
      content: args.content,
    });
  } else if (args.help === true) {
    console.log(`${chalk.cyan("Usage:")} upld --[site_name] --[path_to_csv]`);
  } else {
    console.log(
      `${chalk.yellow("Please provide site name.")}\n${chalk.cyan(
        "Usage:"
      )} upld --[site_name] --[path_to_csv]`
    );
  }
}
