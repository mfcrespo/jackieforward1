import { execSync } from "child_process";

execSync("node scripts/build-events.mjs", { stdio: "inherit" });
execSync("node scripts/build-news.mjs", { stdio: "inherit" });
execSync("node scripts/build-endorsements.mjs", { stdio: "inherit" });