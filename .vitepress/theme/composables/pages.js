import routes from "~pages";

const pages = {};

for (let route of routes) {
  const split = route.path.split("/").slice(0, -1).join("/");
  const folder = trailing(split);
  pages[folder] = pages[folder] || [];
  pages[folder].push(route);
}

export { pages };

export function getSiblings(route) {
  const siblings = {
    prev: null,
    next: null,
  };
  const folder = trailing(route.split("/").slice(0, -2).join("/"));

  const list = pages[folder];
  if (list) {
    const index = list.findIndex((page) => trailing(page.path) == route);
    if (index >= 0 && index <= list.length) {
      siblings.next = list[index + 1];
    }
    if (index > 0) {
      siblings.prev = list[index - 1];
    }
  }
  return siblings;
}

export function getParents(route) {
  const parents = [];
  const url = route.split("/").filter(Boolean);
  for (let i in url) {
    const path = "/" + url.slice(0, -i).join("/");
    console.log(path);
    parents.push(
      routes.find((r) => {
        return r.path == path;
      })
    );
  }
  return parents.filter(Boolean).reverse();
}

export function trailing(url) {
  return (url += url.endsWith("/") ? "" : "/");
}
