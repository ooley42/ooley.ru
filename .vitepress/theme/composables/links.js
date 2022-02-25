import { useData } from "vitepress";
import { computed } from "vue";

import routes from "~pages";

export function useSiblings() {
  const { theme, frontmatter, page } = useData();
  if (!theme.value?.pages) return;

  const pair = computed(() => {
    const tags = frontmatter.value?.tags;
    const pages = theme.value?.pages;
    let prev, next;
    if (tags && typeof tags == "string" && pages[tags]) {
      const index = pages[tags].findIndex((el) => el.title == page.value.title);
      if (index >= 0 && index <= pages[tags].length) {
        next = pages[tags][index + 1];
      }
      if (index > 0) {
        prev = pages[tags][index - 1];
      }
    }
    return { prev, next };
  });
  return pair;
}

export function useParents() {
  const { theme, frontmatter } = useData();
  if (!theme.value?.pages) return;

  const parentsList = computed(() => {
    let tag = frontmatter.value?.tags;
    const pages = theme.value?.pages;
    const parents = [];

    for (let p = 0; p < 5; p++) {
      if (tag == "main") continue;
      let page = pages.all.find((pg) => tag && pg.data?.list == tag);
      if (page) {
        parents.push(page);
      } else {
        continue;
      }
      tag = page.data?.tags;
    }
    return parents.reverse();
  });
  return parentsList;
}
