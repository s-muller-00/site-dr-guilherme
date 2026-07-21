# Site Dr. Guilherme Cerutti Müller — CMS de artigos

Este repositório agora usa **Eleventy** (gerador de site estático) + **Sveltia CMS**
(editor de conteúdo). O objetivo: o Dr. Guilherme escrever e publicar artigos sozinho,
sem mexer em código, de graça.

Fluxo: ele escreve num editor visual em `/admin` → o texto é salvo como Markdown no
GitHub → o Netlify reconstrói o site → o artigo entra no ar em ~1 minuto.

---

## Como funciona (visão técnica)

- Os artigos são arquivos **Markdown** em `netlify-site/artigos/*.md`.
- O Eleventy transforma cada `.md` na página final `artigos/<nome>.html`, usando o
  template `netlify-site/_includes/article.njk` (que reaproveita o design do site).
- A home (`netlify-site/index.html`) é copiada como está — não foi alterada.
- O build gera a pasta `_site/`, que é o que o Netlify publica.

Rodar localmente (opcional, para testar):

```bash
npm install
npm start      # abre em http://localhost:8080
# ou apenas gerar os arquivos:
npm run build  # gera a pasta _site/
```

---

## Configuração inicial (feita UMA vez, por você)

### 1. Subir estes arquivos para o GitHub
Faça commit e push de tudo para a branch `main`. O `netlify.toml` já diz ao Netlify
para rodar `npm run build` e publicar a pasta `_site` — não precisa mexer em
configuração de build no painel do Netlify.

> Se o painel do Netlify tiver um "publish directory" antigo (ex.: `netlify-site`),
> pode deixar — o `netlify.toml` tem prioridade. Se quiser, alinhe para `_site`.

### 2. Criar o app OAuth do GitHub (para o login do CMS)
1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Preencha:
   - **Application name:** `Site Dr Guilherme — CMS`
   - **Homepage URL:** `https://drgcmuller.com.br`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. Crie o app, copie o **Client ID** e gere um **Client Secret**.

### 3. Ligar o OAuth no Netlify
No Netlify: **Site configuration** → **Access & security** → **OAuth** →
**Install provider** → escolha **GitHub** → cole o Client ID e o Client Secret.

(É o método embutido do Netlify. Não precisa de Cloudflare Worker nem do antigo
Netlify Identity — que foi descontinuado e era o motivo de o CMS anterior não funcionar.)

### 4. Dar acesso ao Dr. Guilherme
O login do CMS é feito com a conta do GitHub dele. Para ele poder publicar:
- Crie/entre com a conta GitHub do Dr. Guilherme.
- No repositório: **Settings** → **Collaborators** → **Add people** → adicione o
  usuário dele com permissão de escrita (Write).
- Ele aceita o convite por e-mail.

Pronto. A partir daí ele acessa `https://drgcmuller.com.br/admin`.

---

## Como o Dr. Guilherme publica um artigo

1. Acessa `https://drgcmuller.com.br/admin`
2. Clica em **Login with GitHub** (só na primeira vez pede autorização)
3. **Artigos** → **New Artigo** (ou clica num existente para editar)
4. Preenche Título, Data, Categoria, Resumo e escreve o Conteúdo no editor visual
5. Clica em **Publish**
6. Em ~1 minuto o artigo está no ar (o Netlify reconstrói sozinho)

---

## Notas para o desenvolvedor

- **Adicionar uma categoria nova:** inclua a opção na lista `category` em
  `netlify-site/admin/config.yml` **e** adicione a mesma chave em
  `netlify-site/_data/covers.js` (com o ícone/cor da capa).
- **Mudar o design do artigo:** edite `netlify-site/_includes/article.njk` e/ou
  `netlify-site/artigos/site.css`.
- **Campos do artigo:** definidos em `netlify-site/admin/config.yml` (`fields`) e
  consumidos pelo template. Se adicionar um campo, use-o no `.njk`.

---

## Telefone padronizado

Número oficial em todo o site: **(51) 9 8960-1177** (`5551989601177` nos links).
Mantenha o mesmo número no Google Business Profile e nos diretórios (Doctoralia etc.)
para não quebrar o NAP (consistência de nome/endereço/telefone) do SEO local.
