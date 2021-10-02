const chalk = require("chalk");

export default {
  ENOENT: `${chalk.hex("#ff9d00")(
    "CSV not located!"
  )} Ensure path name is relative to ${chalk.green("package.json")}`,
};
