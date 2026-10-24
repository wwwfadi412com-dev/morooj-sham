// Build a static export for GitHub Pages and force-push it to the gh-pages branch.
// Usage: npm run deploy
import { execSync } from "node:child_process";
import { writeFileSync, rmSync } from "node:fs";

const REPO = "https://github.com/wwwfadi412com-dev/morooj-sham.git";
const BASE_PATH = "/morooj-sham";
const SITE_URL = `https://wwwfadi412com-dev.github.io${BASE_PATH}`;

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });

rmSync("out", { recursive: true, force: true });
run("npx next build", {
  env: {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: "1",
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || SITE_URL,
  },
});

// Without this GitHub Pages runs Jekyll, which drops the _next/ folder.
writeFileSync("out/.nojekyll", "");

// core.longpaths: Windows checkouts in deep folders exceed MAX_PATH for _next chunks.
const git = (cmd) => run(`git -c core.longpaths=true ${cmd}`, { cwd: "out" });
git("init -q -b gh-pages");
git("add -A");
git(`-c user.name="deploy" -c user.email="deploy@moroojsham" commit -q -m "Deploy ${new Date().toISOString()}"`);
git(`push -f ${REPO} gh-pages`);
console.log(`\nDeployed: ${SITE_URL}/`);
