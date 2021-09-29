import medium from "./medium";
import getArgs from "./parser";

export async function cli(rawArgs) {
  const args = getArgs(rawArgs);

  // console.log(args);

  if (args.medium === true) {
    await medium({
      csvPath: args.csv,
      title: args.title,
      content: args.content,
    });
  }
}
