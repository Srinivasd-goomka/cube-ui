import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

// This function retrieves the current Git commit hash and date.
function getGitCommitInfo() {
  let hash = 'unknown';
  let date = 'unknown';

  try {
    hash = execSync('git rev-parse HEAD').toString().trim();
    date = execSync('git log -1 --format=%cd').toString().trim();
  } catch {
    console.warn('Git info not found, using "unknown".');
  }

  return { hash, date };
}

const git = getGitCommitInfo();

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  // server: {
  //   host: true,
  //   port: 8000, 
  //   proxy: {
  //     '/api': {
  //       target: 'https://test001.goomka.com/Goomka_Cube_API/public/api',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
  define: {
    __COMMIT_HASH__: JSON.stringify(git.hash),
    __COMMIT_DATE__: JSON.stringify(git.date),
  },
});
