import routes from "~pages";

const pages = {};

for (let route of routes) {
  const split = route.path.split("/");
  const name = split.pop();
  const folder = split.join("/") + "/";
  pages[folder] = pages[folder] || [];
  pages[folder].push(route);
}

export { pages };
