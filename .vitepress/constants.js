const isProd = process.env.NODE_ENV === "production";

const site = isProd ? "https://defucc.github.io" : "http://localhost:3000";

export const metaData = {
  title: "Фонд ФРУКТ",
  description: "Фонд Развития Универсализации, Кооперации и Творчества",
  site,
  locale: "ru",
  icon: "/media/logo/sq-round.svg",
  logo: "/media/logo/logo_stencil.svg",
  author: "Davay",
  tags: "фонд, развитие, универсализация, кооперация, творчество, дарономика, социокультурные проекты",
};
