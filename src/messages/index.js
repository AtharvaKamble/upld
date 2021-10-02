const chalk = require("chalk");

export default {
  errors: {
    ENOENT: `${chalk.hex("#ff9d00")(
      "CSV not located!"
    )} Ensure path name is relative to ${chalk.green("package.json")}`,
    ARG_UNKNOWN_OPTION: chalk.yellow(`Invalid argument provided.`),
  },
  USAGE: `${chalk.cyan("Usage:")} upld --[site_name] --[path_to_csv]`,
};
