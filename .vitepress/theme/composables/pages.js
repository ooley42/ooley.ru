import routes from "~pages";

const pages = {};

for (let route of routes) {
  const split = route.path.split("/").slice(0, -1).join("/");
  const folder = trailing(split);
  pages[folder] = pages[folder] || [];
  pages[folder].push(route);
}

for (let folder in pages) {
  pages[folder].sort((a, b) => {
    if (a?.date && b?.date) {
      return a.date > b.date ? -1 : 1;
    } else {
      return 0;
    }
  });
}

export { routes, pages };

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

export function getMediaPath(media, route) {
  // console.log(route);

  const filePath = route?.path.split("/").filter(Boolean).join("-");
  let p = `/media_files/${media}/${filePath}-${route?.data?.[media]}`;
  console.log(p);
  return p;
}


import Fuse from "fuse.js";
export const fuse = new Fuse(routes, {
  includeScore: true,
  ignoreLocation: true,
  keys: ["title", 'subtitle', 'city', 'place'],
});