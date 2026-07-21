// Configuração aplicada a todos os artigos (.md) desta pasta.
module.exports = {
  layout: "article.njk",
  tags: "artigos",
  // Cada artigo vira artigos/<nome-do-arquivo>.html (mantém as URLs atuais)
  permalink: (data) => `artigos/${data.page.fileSlug}.html`,
};
