import medium from "./medium";
import tumblr from "./tumblr";
import devto from "./devto";
import getArgs from "./parser";
import chalk from "chalk";
import MESSAGES from "./messages";
import { renderArgumentsList } from "../src/helpers";

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
  } else if (args.devto === true) {
    await devto({
      csvPath: args.csv,
      title: args.title,
      content: args.content,
    });
  } else if (args.help === true) {
    console.log(MESSAGES.USAGE);
  } else if (args.showArgList === true) {
    renderArgumentsList();
  } else {
    console.log(
      `${chalk.yellow("Please provide site name.")}\n${MESSAGES.USAGE}`
    );
  }
}
