import MESSAGES from "../messages";

const ui = require("cliui")();
const chalk = require("chalk");

export function getCanonicalUrl({ domain, slug, utmSource }) {
  return `${domain}/development/${slug}?utm_source=${utmSource}&utm_campaign=crosspost`;
}

export function renderArgumentsList() {
  ui.div({ text: MESSAGES.USAGE, padding: [1, 0, 1, 0] });

  ui.div({
    text: chalk.black.bgWhite("Site Flags:"),
    padding: [1, 0, 1, 0],
  });

  ui.div(
    {
      text: "--medium",
      width: 20,
      padding: [0, 4, 0, 4],
    },
    {
      text: `If you want to post to ${chalk.cyan("Medium")}`,
      width: 40,
    },
    {
      text: chalk.hex("#5400a3")("Boolean"),
      align: "left",
      padding: [0, 0, 0, 0],
    },
    {
      text: chalk.hex("#ff8000")("[required]"),
      align: "left",
    }
  );

  ui.div(
    {
      text: "--tumblr",
      width: 20,
      padding: [1, 4, 0, 4],
    },
    {
      text: `If you want to post to ${chalk.cyan("Tumblr")}`,
      width: 40,
      padding: [1, 0, 0, 0],
    },
    {
      text: chalk.hex("#5400a3")("Boolean"),
      align: "left",
      padding: [1, 0, 0, 0],
    },
    {
      text: chalk.hex("#ff8000")("[required]"),
      align: "left",
      padding: [1, 0, 0, 0],
    }
  );

  ui.div(
    {
      text: "--devto",
      width: 20,
      padding: [1, 4, 0, 4],
    },
    {
      text: `If you want to post to ${chalk.cyan("dev.to")}`,
      width: 40,
      padding: [1, 0, 0, 0],
    },
    {
      text: chalk.hex("#5400a3")("Boolean"),
      align: "left",
      padding: [1, 0, 0, 0],
    },
    {
      text: chalk.hex("#ff8000")("[required]"),
      align: "left",
      padding: [1, 0, 0, 0],
    }
  );

  ui.div({
    text: chalk.black.bgWhite("Additional Flags:"),
    padding: [1, 0, 1, 0],
  });

  ui.div(
    {
      text: "--csv",
      width: 20,
      padding: [0, 4, 0, 4],
    },
    {
      text: `The path to your CSV file w.r.t ${chalk.green("package.json")}`,
      width: 40,
      padding: [0, 0, 0, 0],
    },
    {
      text: chalk.hex("#5400a3")("String"),
      align: "left",
      padding: [0, 0, 0, 0],
    },
    {
      text: chalk.hex("#ff8000")("[required]"),
      align: "left",
      padding: [0, 0, 0, 0],
    }
  );

  console.log(ui.toString());
}
