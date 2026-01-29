# Criando seu jogo de memória estilo Genius

## Bootcamp "Eduzz Fullstack Developer #2" - Digital Innovation One

Projeto desenvolvido com instruções de [Gabriela Pinheiro] na trilha de estudo do Bootcamp "Eduzz Fullstack Developer #2" da [dio.me].

<p align="center">
	<img alt="Repository language count" src="https://img.shields.io/github/languages/count/didifive/genesis-dio">
	<a href="https://www.linkedin.com/in/gabrielapinheiro129/">
		<img alt="Made by Gabriela" src="https://img.shields.io/badge/made%20by-Gabriela-blue">
	</a>
	<a href="https://www.linkedin.com/in/luis-carlos-zancanela/">
		<img alt="Update by Didi" src="https://img.shields.io/badge/update%20by-Didi-green">
	</a>
	<a href="https://github.com/didifive/genesis-dio/commits/master">
		<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/didifive/genesis-dio?color=blue">
	</a>
	<img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?color=blue">
</p>

<p align="center">
  <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Introduction">
	  <img alt="JavaScript" src="https://img.shields.io/static/v1?color=yellow&label=Dev&message=JavaScript&style=for-the-badge&logo=Javascript">
	</a>
  <a href="https://www.w3schools.com/html/">
	  <img alt="HTML5" src="https://img.shields.io/static/v1?color=red&label=Dev&message=HTML5&style=for-the-badge&logo=HTML5">
	</a>
  <a href="https://www.w3schools.com/css/">
	  <img alt="CSS3" src="https://img.shields.io/static/v1?color=blue&label=Dev&message=CSS3&style=for-the-badge&logo=CSS3">
	</a>
  <a href="https://getbootstrap.com/">
	  <img alt="Bootstrap" src="https://img.shields.io/static/v1?color=purple&label=Dev&message=Bootstrap&style=for-the-badge&logo=Bootstrap">
	</a>
</p>

Link da base utilizada neste projeto: [SpruceGabriela/genesis-dio].

---

Abaixo seguem modificações feitas em relação ao projeto base:
* Remoção de todos os `alert()` - substituídos por modal elegante com informações detalhadas
* Criação de círculo no centro do jogo exibindo o nível atual com fonte responsiva
* Implementação de modal para exibição de Game Over com:
  - Nível em que o jogador errou
  - Quantidade de níveis completados com pluralização dinâmica
  - Seu melhor recorde
* Correção da lógica de score: só incrementa quando acerta, não quando inicia o nível
* Refatoração do código JavaScript com constantes para elementos do DOM
* Integração do Bootstrap 5.3 para melhor estrutura e responsividade
* Design aprimorado com:
  - Gradientes suaves nas cores
  - Efeitos hover melhorados
  - Animações fluidas (fade-in, slide-up)
  - Cores mais vibrantes nos botões
  - Shadows e profundidade visual
* Responsividade completa:
  - Mobile-first design (até 576px)
  - Tablet (577px - 768px)
  - Desktop (769px+)
  - Uso de `clamp()` para tipografia fluida
  - Aspect-ratio responsivo para o jogo circular
* Uso de CSS Variables para melhor manutenção do código
* Cabeçalho com barra de navegação para controlar play e demonstrar recorde
* Recorde utiliza `localStorage` para guardar dados no navegador
* Efeitos sonoros para as cores
* Responsividade adaptativa com media queries

---

Projeto online em: [genius.zancanela.dev.br](https://genius.zancanela.dev.br)  
[![Netlify Status](https://api.netlify.com/api/v1/badges/6f4aaf16-8c1f-43a8-bcd6-896631a54fbf/deploy-status)](https://app.netlify.com/sites/genius-didi/deploys)

---

Links Interessantes:
* [HTML5]
* [CSS3]
* [JavaScript]
* [Bootstrap]
* [Netlify]
* [freesound]

[dio.me]: https://dio.me/
[Gabriela Pinheiro]: https://www.linkedin.com/in/gabrielapinheiro129/
[SpruceGabriela/genesis-dio]: https://github.com/SpruceGabriela/genesis-dio
[didifive/genesis-dio]: https://github.com/didifive/genesis-dio
[HTML5]: https://www.w3schools.com/html/
[CSS3]: https://www.w3schools.com/css/
[JavaScript]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Introduction
[Bootstrap]: https://getbootstrap.com/
[Netlify]: https://www.netlify.com/
[freesound]: https://freesound.org/
