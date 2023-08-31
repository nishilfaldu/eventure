import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";



const PAGE_DIR = path.resolve(__dirname, "..", "app");
interface PageData {
  name: string;
  path: string;
}



async function getPagePaths(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });

  return Promise.all(entries.map(entry => {
    if (entry.isDirectory()) {
      return getPagePaths(path.join(dir, entry.name))
        .then(paths => paths.map(p => path.join(entry.name, p)));
    } else if (entry.isFile() && !entry.name.startsWith("_")) {
      return [entry.name];
    } else {
      return [];
    }
  })).then(res => res.flat());
}

async function generatePageConstants(paths: string[]): Promise<PageData[]> {
  /** Map from page name to page path. */
  const foundNames = new Map<string, string>();

  return Promise.all(paths.map(async p => {
    const filedata = await readFile(path.join(PAGE_DIR, p), "utf8");
    const nameMatch = filedata.match(/const\s+(\w+):\s*NextPage/);
    if (!nameMatch) {
      return console.warn(`Could not find a NextPage in '${p}'`);
    }

    const name = nameMatch[1];
    if (foundNames.has(name)) {
      return console.error(`'${name}' already defined in '${foundNames.get(name)}', skipping '${p}'...`);
    }
    foundNames.set(name, p);

    return {
      name,
      path: "/" + p.replace(/((\/|^)index)?\.[jt]sx?$/, ""),
    };
  })).then(data => data.filter(d => d) as PageData[]);
}

function writePageConstants(filename: string, pageData: PageData[]) {
  const filedata = "export enum PagePaths {\n"
    + pageData.map(pd => `  ${pd.name} = "${pd.path}",`).join("\n")
    + "\n}\n";

  return writeFile(filename, filedata, "utf8");
}



(async function main() {
  const paths = await getPagePaths(PAGE_DIR);
  const pageData = await generatePageConstants(paths);

  return writePageConstants(path.resolve(__dirname, "..", "generated", "pages.ts"), pageData);
})();
