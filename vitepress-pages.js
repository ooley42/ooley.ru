import fs from "node:fs";
import path from "node:path";
import appRoot from "app-root-path";
import matter from "gray-matter";

const root = appRoot.toString();

const publicMedia = ["icon", "cover"];
const mediaFolder = "media_files";

export function extendRoute(route) {
  const pageDir = path.join(root, route.component);
  const fileContent = fs.readFileSync(pageDir, { encoding: "utf8" });
  const frontmatter = matter(fileContent);
  const data = frontmatter.data;
  const content = frontmatter.content;

  const page = {
    ...route,
    ...data,
    // content,
  };

  for (let media of publicMedia) {
    if (data[media]) {
      let file = data[media];
      const filePath = path.join(route.path, file);
      const fileName = filePath.split("/").filter(Boolean).join("-");
      // const from = path.join(root, fileDir);
      // const webDir = path.join("public/media/", fileDir);
      // const to = path.join(root, webDir);
      const publicPath = path.join(root, "public", mediaFolder, media);

      if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, {
          recursive: true,
        });
      }
      page[media] = path.join("/", mediaFolder, media, fileName);

      fs.copyFileSync(
        path.join(root, filePath),
        path.join(publicPath, fileName)
      );
    }
  }

  return page;
}
