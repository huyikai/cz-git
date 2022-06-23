import path from "path";
import cacheDir from "cachedir";
import { ensureDir } from "fs-extra";
import { getCacheValueSync, writeCacheSync, gitCommit } from "../shared";
import { style } from "cz-git";
import type { CommitizenType } from "cz-git";
import type { CallBackFn, CzGitPrompter, CommitOptions } from "../shared";

/**
 * generate cz-git prompt get commit message
 */
export const commit = (
  inquirer: CommitizenType,
  repoPath: string,
  prompter: CzGitPrompter,
  options: CommitOptions,
  done: CallBackFn
) => {
  const cacheDirectory = cacheDir("cz-git");
  const cachePath = path.join(cacheDirectory, "commit.json");

  ensureDir(cacheDirectory, (err: any) => {
    if (err) {
      console.error("Couldn't create commitizen cache directory: ", err);
    } else {
      if (options.retryLastCommit) {
        console.log(style.green(">>> Retrying last commit attempt."));
        const { options: retryOptions, template: retryTemplate } = getCacheValueSync(
          cachePath,
          repoPath
        );
        console.log(style.gray(retryTemplate));
        gitCommit(repoPath, retryTemplate, { ...retryOptions, ...options }, done);
      } else if (options.rebackLastCommit) {
        // TODO: reback last commit
        process.exit(0);
      } else {
        prompter(inquirer, (commitMsg: string | Error) => {
          if (commitMsg instanceof Error) {
            return done(commitMsg);
          }
          writeCacheSync(cachePath, repoPath, { template: commitMsg, retryOptions: options });
          gitCommit(repoPath, commitMsg, options, done);
        });
      }
    }
  });
};
