const markdownIt = require("markdown-it");

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun",
               "jul", "ago", "set", "out", "nov", "dez"];

module.exports = function (eleventyConfig) {
  // Markdown: permite HTML cru dentro do .md (ex.: o bloco <div class="note">)
  eleventyConfig.setLibrary("md", markdownIt({ html: true, linkify: true }));

  // Data em pt-BR abreviada: 12 mai 2026
  eleventyConfig.addFilter("dataPt", (d) => {
    const dt = d instanceof Date ? d : new Date(d);
    return `${dt.getUTCDate()} ${MESES[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
  });

  // Os outros artigos (para o bloco "Continue lendo"), no máximo 2
  eleventyConfig.addFilter("outrosArtigos", (arr, url) =>
    (arr || []).filter((p) => p.url !== url).slice(0, 2)
  );

  // Arquivos copiados sem processamento (mantêm o caminho de saída)
  eleventyConfig.addPassthroughCopy({
    "netlify-site/assets": "assets",
    "netlify-site/artigos/site.css": "artigos/site.css",
    "netlify-site/artigos/site.js": "artigos/site.js",
    "netlify-site/admin": "admin",
    "netlify-site/robots.txt": "robots.txt",
    "netlify-site/sitemap.xml": "sitemap.xml",
  });

  // A pasta admin é só do CMS — não deve ser tratada como template
  eleventyConfig.ignores.add("netlify-site/admin/**");

  return {
    dir: {
      input: "netlify-site",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // index.html é copiado literalmente (sem engine de template)
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
  };
};
