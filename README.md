# FrontLuccaTest

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Start the app

To start the development server run `npm run serve`. Open your browser and navigate to http://localhost:4200/. Happy coding!

To format the code, run `npm run format`.

To start the storybook, run `npm run storybook`. Open your browser and navigate to http://localhost:4400/. Happy coding!

## Explications

Avant toute chose, je n'ai jamais initié de projet de ma vie, c'est mon tout premier !

### NX

J'ai voulu profiter de ce projet pour me former sur NX. Vu la taille de l'application qui m'a été demandée, on n'était clairement pas obligé de partir là dessus. Ou alors on pourrait se dire que ce que vous m'avez demandé n'est pas le projet fini et donc là oui, NX peut être une bonne solution.

### NGRX

Je voulais mettre en place un store, en lisant la nouvelle doc angular, j'ai vu qu'il existait un store NGXS, soit disant beaucoup plus simple que NGRX, mais je n'ai pas réussi à l'utiliser dans mon resolver ... Peut-être que j'aurai réussi en y passant plus de temps ┐(￣ヘ￣;)┌

Je suis donc partie sur du NGRX. NGRX est une solution utilisée normalement pour de grosses applications, ici, je trouve que c'est overkill mais si on se dit que l'application va grossir, autant partir dès le début sur de bonnes bases, et donc, sur du NGRX.

### Resolver

J'ai créé un resolver pour récupérer toutes les dépenses avant d'afficher la "Expense page".

### Storybook

J'ai créé un storybook, pareil, un peu overkill ici (surtout qu'on n'avait dit pas de CSS), une simple librairie de composants aurait suffit. Mais je voulais en profiter pour apprendre à en mettre un en place.

### TU

Concernant les tests unitaires, je n'ai pas voulu investir beaucoup de temps, sur un vrai projet, j'aurai mis des TU sur chaque fichier, là, je l'ai fait uniquement sur le composant expenses-form.component pour vous montrer que je sais en faire et comment je les écris.

### Prettier/ESLint

Plus un code est beau/lisible, moins il y a de chance qu'il est ait de bug, plus il est maintenable, plus c'est plaisant de développer, etc.

### TypeStrict

Pour encore plus de typage !

### Formulaire

J'ai utilisé les ReactiveFormsModule car c'est ce que j'utilise sur mon projet actuel et j'aime bien. C'est aussi ce qui est recommandé sur la documentation d'angular. Je n'ai cependant pas utilisé les controls value accessor car j'ai toujours eu du mal avec, sur mon projet actuel ça nous a tous plus embêté qu'autre chose.

### Routing

Je n'ai créé qu'une seule page, mais je n'ai pas vu l'intérêt d'en créer plus ┐(￣ヮ￣)┌

### Commit

Là je suis sur un projet en solo donc j'ai un peu commit n'importe comment, mais sinon je rédige mes messages comme ceci :
`feat(expenses) : Create app expenses - REF: JIRA-234743`
En me rapprochant au mieux du conventionnal commit => https://www.conventionalcommits.org/en/v1.0.0/

### Si j'avais voulu y passer plus de temps, j'aurai ...

-   typé d'avantage (comme le formulaire par exemple)
-   créé plus de contantes pour les messages, titres, labels, etc.
-   géré un peu mieux les messages d'erreurs, là je suis allé au plus simple
-   créé des states pour chaques éléments de mon storybook
-   faire une lib par composant de storybook
-   mis du CSS ♡ et fait un rendu un peu plus jolie
-   plus de test (TU + cypress)
-   meilleure gestion des erreurs, par exemple l'api ne répond pas
-   peut-être regardé pour créer des formulaires dynamiques à partir d'un fichier json en fonction du type de dépense
-   mis en place des loader et loading page
-   pour les inputs qui n'autorise que des number, j'aurai rajouté des règles de gestion supplémentaire pour ne pas autoriser certains char comme "E"
-   mis plus de règles ESLint/Prettier, j'ai pas pris le temps de regarder tous ce qui était possible
