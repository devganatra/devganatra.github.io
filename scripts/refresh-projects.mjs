import { mkdir, readFile, writeFile } from "node:fs/promises";

const username = "devganatra";
const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "devganatra-portfolio-project-sync",
};

if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`, { headers });
if (!response.ok) throw new Error(`GitHub API returned ${response.status}: ${await response.text()}`);

const repositories = (await response.json())
  .filter((repository) => !repository.fork)
  .map((repository) => ({
    name: repository.name,
    description: repository.description,
    html_url: repository.html_url,
    homepage: repository.homepage,
    language: repository.language,
    stargazers_count: repository.stargazers_count,
    forks_count: repository.forks_count,
    topics: repository.topics || [],
    updated_at: repository.updated_at,
    fork: false,
  }));

await mkdir("data", { recursive: true });

let currentRepositories = [];
try {
  const current = JSON.parse(await readFile("data/projects.json", "utf8"));
  currentRepositories = current.repositories || [];
} catch {
  // A missing or invalid snapshot should be replaced with a fresh one.
}

if (JSON.stringify(currentRepositories) === JSON.stringify(repositories)) {
  console.log(`Project snapshot is current (${repositories.length} repositories)`);
  process.exit(0);
}

const snapshot = { generated_at: new Date().toISOString(), repositories };
await writeFile("data/projects.json", `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Updated data/projects.json with ${repositories.length} repositories`);
