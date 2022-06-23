/** `czg` help document */
import { style } from "cz-git";
export const generateHelp = (version: string, code = 0) => {
  // prettier-ignore
  console.log(
    `${style.yellow("NAME:")} 
    ${style.green("czg")} - Interactive Commitizen CLI that generate standardized commit messages

${style.yellow("WEBSITE:")}
    ${style.underline("https://cz-git.qbenben.com/cli/")}
    ${style.underline("https://github.com/Zhengqbbb/cz-git")}

${style.yellow("VERSION:")} ${version}

${style.yellow("SYNOPSIS:")}
    czg [subcommand] [options]

${style.yellow("SUBCOMMAND:")}
    ${style.cyan("break")}          ${style.red("Turn on BREAKING CHANGE mode, Add ! mark on header")}
    ${style.cyan("emoji")}          ${style.red("Turn on emoji mode")}
    ${style.cyan("checkbox")}       ${style.red("Turn on scope checkbox mode")}
    
${style.yellow("OPTIONS:")}
    ${style.cyan("--config")}       ${style.red("Specify the configuration file to use")}
    ${style.cyan("--retry|-r")}     ${style.red("Direct retry submit by the last message")}
    ${style.cyan("--help|-h")}      ${style.red("Show help")}
    ${style.cyan("--version")}      ${style.red("Show version")}

${style.yellow("EXAMPLES:")}
    ${style.cyan("czg")}
    ${style.cyan("czg emoji")}
    ${style.cyan("czg --config=\"./config/cz.json\"")}

Extends 'git commit' command and options. 
See 'git commit --help' for more information. `
  );
  process.exit(code);
};
