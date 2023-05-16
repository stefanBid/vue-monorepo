# Vue-Monorepo `v.1.0`

>**🤖 _INFO:_** La versione 1.0 contiene una monorepo stabile configurata per contenere al suo interno un numero di progetti Vue pari a **1**.<br>
Nel **branch** `master` (quello da clonare) si trova la versione stabile della monorepo, mentre nel **branch** `develop` si trova la monorepo in fase di sviluppo per il successivo rilascio di nuove versioni.
<br>
<br>
La consultazione di questa repository è consigliata a chi vuole prendere familiarità con:
<br>
-**Il gestore di pacchetti pnpm**
<br>
-**Vite (for Vue + Typescript projects)**
<br>
-**Tailwind CSS**
<br>
-**DevExtreme e le sue componenti**
<br>
-**Vue router**
<br>
-**Pinia**
<br>
-**Axsios**

<br>
<br>

Questa **monorepo** contiene al suo interno una serie di  progetti `Vue3` configurati con `Vite`.

La gestione dei pacchetti avviene tramite `pnpm`.

Se si clona il contenuto della repo l'unico comando da eseguire per farla funzionare è:

```sh
> pnpm install
```
Di seguito invece è mostrata la guida per configurarla partendo da una directory vuota.

La guida prevede tre macro fasi:
1) **Setup**;
2) **aggiunta configurazioni di librerie comuni utilizzate dai più progetti**;
3) **aggiunta componenti vue riutilizzabili tra i progetti**.

<br>
<br>

# <span style="color:#8FE3CF">SETUP</span>

<br>

## <span style="color:#19A7CE">Passo 1 Setup iniziale</span>
Attraverso i comandi:
```sh
> pnpm init 
> git init
```
Genero il file `package.json` nel root-folder gestore del repository principale della mia monorepo.

Il file creato automaticamente avrà la seguente forma:
```JSON
{
  "name": "demo-monorepo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

E con `git` chiaramente il la gestione per il controllo della versione.

Per questo motivo creo un file `.gitignore` per escudere tuttii file contenutio all'interno delle cartelle `node-modules` che possiamo installare localmente nella macchina dove eseguiremo in dev-mode i progetti demo.

### <span style="color:#FFA559">Passo 1.1 Organizzazione delle directory nel monorepo Demo</span>

La struttura organizzativa della monorepo dovrà essere qualcosa di simile:
```
demo-monorepo/
├─ @app/
|  ├─ Vue projects
│  ├─ ...
├─ packages/
│  ├─ Componenti o file di configurazione comuni
│  ├─ ...
├─ .gitignore
├─ package.json
├─ ... altri file di root
```

### <span style="color:#FFA559">Passo 1.2 Usare gli spazi di lavoro </span>

Creando un file `pnpm-workspace.yaml` andiamo a specificare al nostro gestore che useremo gli spazi di lavoro.
In esso definiamo un paio di percorsi in cui qualsiasi directori che creiamo verrà interpretata come un **package autonomo**.

Il file avrà la seguente configurazione in base alla struttura organizzativa della monorepo pensarta nel passo **1.1**.

```yaml
packages:
- ./@app/*
- ./packages/*
```

### <span style="color:#FFA559">Passo 1.3 Creare dei progetti Vue</span>

Attraverso Vite configuro velocemente due progetti vue:
- `user-manage-app` 
- `book-manage-app` 


In questo mi viene in aiuto il gestore dei pacchetti `pnpm` :

```sh
> pnpm create vite@latest
```
La configurazione base dei progetti **Vue3** con **Vite** avranno la seguente configurazione:

```sh
√ Select a framework: » Vue
√ Select a variant: » TypeScript
```
<br>

## <span style="color:#19A7CE">Passo 2 Setup progetti <span style="color:green">Vue</span></span>

>**⚠️ _PASSI ESEGUITI:_** Per non essere ripetitivo :) mostro solamente la configurazione iniziale del progetto `user-manage-app`. Tuttavia può essere applicata a tutti gli altri progetti presnti nella directory `@app`.

> **📦 _VERSIONI DELLE DIPENDENZE:_** Le versioni quando si genereranno i progetti potrebbero essere diverse`.

### <span style="color:#FFA559">Passo 2.1 Modifiche al file `package.json`</span>

Il file generato automaticamente da **Vite** avrà la seguente forma:

```JSON
{
  "name": "user-manage-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.1.0",
    "typescript": "^5.0.2",
    "vite": "^4.3.2",
    "vue-tsc": "^1.4.2"
  }
}
```

La modifica che andiamo ad effettuare è quella di cambiare il nome del progetto allineandolo alla convenzione utilizzata durante la realizzazione di **monorepo**:

```
@[nome_monorepo]/[nome_progetto]
```

nel nostro caso:

```JSON
{
  "name": "@demo/user-manage-app",
  ...
}
```

### <span style="color:#FFA559">Passo 2.2 Modifiche al file `tsconfig.json`</span>

Il file generato automaticamente da **Vite** avrà la seguente forma:

```JSON
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
Potremmo avere bisogno di questo file per definire alcune configurazionio globali quindi ne copiamo il contenuto e lo incolliamo in un nuovo file `tsconfig.json`, che creiamo nella **root directory**. 

Ciò che andiamo ad incollare in questo file sono solo le impostazioni comuni e poi indichamo che queste impostazioni comuni vengono estese da altri file `tsconfig.json` presenti nelle directory dei progetti vue:

```JSON
{
    "compilerOptions": {
      "target": "ES2020",
      "useDefineForClassFields": true,
      "module": "ESNext",
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "skipLibCheck": true,
  
      /* Bundler mode */
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "preserve",
  
      /* Linting */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true
    },
    /* References to tsconfig.json of other Vue projects */
    "references": [
      { 
        "path": "@app/user-manage-app" 
      }
    ]
  }
```

mentre nel file `tsconfig.json` del progetto **Vue** definiamo una proprietà di estensione che prende un percorso verso un'altra configurazione ossia quella definita nella **root directory**, questo file ora avrà ora il seguente aspetto: 

```JSON
{
  "extends":"../../tsconfig.json",
  "compilerOptions": {
    "composite": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

<br>

## <span style="color:#19A7CE">Passo 3 Definizione di alcuni comandi</span>

Nel file `package.json` generato nel **Passo 1** vado amodificare l'attributo `scripts` nel seguente modo:

```JSON
{
...
"scripts":{
    "userapp": "pnpm --filter @demo/user-manage-app"
},
...
}
```

Aggiungo tanti script quanti sono i progetti **Vue** nella directory **@app**, lo scopo di questo script è quello di non dover utilizzare per forza il filtro `@[nome_monorepo]/[nome_progetto]`.


<br>

## <span style="color:#19A7CE">Passo 4 Spostare TypeScript come diopendenza di I° livello</span>

Essendo che tutti i progetti inclusi in questa **monorepo demo** utilizzano TypeScrip voglio spostarno a livello globale in modo da avere un suo versioning coerente tra tutti i progetti in modo da non incorrere in futili problemi di compatibilità.

Quando si vogliono installare i pacchetti a livello di root  `pnpm` chiede una conferma percapire se non si sta eseguendo quest azione per errore, quindi quando si eseguono questi tipi di comando bisogna aggiungere il **flag W**.

Il comando è il seguente:

```sh
> pnpm add -Dw typescript
```

Dopo l'esecuzione di questo comando si creerà automaticamente un nuovo file `pnpm-lock.yaml` in cui sono presenti i riferimenti alle dipendenze installate a livello di root.

Fatto ciò rimuoviamo le dipendenze di typescript interne ai progetti **Vue**presenti nei rispettivi `package.json`:

```JSON
{
...
"devDependencies": {
    "@vitejs/plugin-vue": "^4.1.0",
    "typescript": "^5.0.2", /*<-- da rimuovere*/
    "vite": "^4.3.2",
    "vue-tsc": "^1.4.2"
}
...
}
```
<br>
<br>
<br>

# <span style="color:#8FE3CF">Aggiunta configurazioni di librerie comuni utilizzate dai più progetti</span>

Tutte le configurazioni di librerie comuni a vari progetti presenti nella directory **@app** devono essere inserite nella directory **packages**  con una sub-directory a loro dedicata in cui andiamo ad esplicitare tutti i file di configurazione necessari.


## <span style="color:#19A7CE">Aggiunta Tailwind </span>

Tailwind è un framework CSS che per essere abilitato in un qualsiasi progetto Vue ha bisosogno di due file di configurazione:
- `tailwind.config.js`
- `postcss.config.js`

Per ulteriori informazioni consultare la [guida per configurare Tailwind](https://tailwindcss.com/docs/guides/vite#vue) in un progetto Vite.

Visto che Tailwind è un framework utilizzato da più progetti nella **monorepo demo** la sua configurazione sarà a livello di root e poi inclusa nei progetti dove viene utilizzata.

Per fare ciò creiamo una nuova sub-directory in **packages** a cui daremo un nome intuitivo come **tailwind-config**.

Al sui interno oltre ai due file di configurazione di tailwind sopra specificati vado ad aggiungere l'mmancabile `package.json` per gestire tale configurazione.

Se tutto è fatto correttamente la struttura della **monorepo** avrà questa forma:

```diff
    demo-monorepo/
    ├─ @app/
    |  ├─ Vue projects
    │  ├─ ...
    ├─ packages/
+   |  ├─ tailwind-config
+   |     ├─ tailwind.config.js
+   │     ├─ postcss.config.js
+   │     ├─ package.json
+   │  
    ├─ .gitignore
    ├─ package.json
    ├─ ... altri file di root
```
### <span style="color:#FFA559">Setup file `package.json`</span>

In questo file andiamo a definire il nome del nostro pacchetto come riferimento quando lo andiamo ad importare nei progetti del nostro **monorepo**.

Il nome del pacchetto segue la stessa sintassi utilizzata per definire i noi dei progetti ossia:

```
@[nome_monorepo]/[nome_package]
```

Il punto di partenza perciò sara questo:

```JSON
{
    "name":"@demo/tailwind-config",
    "private": "true",
    "version": "0.0.0",
}
```

Con il gestore dei pacchetti `pnpm` installo alcune dipendenze con il seguente comando:

```sh
> pnpm --filter @demo/tailwind-config add autoprefixer postcss tailwindcss 
```

Installate le dipendenze il file **json** del nostro pacchetto di configurazione di tailwind avrà il seguente aspetto:

```JSON
{
    "name": "@demo/tailwind-config",
    "private": "true",
    "version": "0.0.0",
    "dependencies": {
        "autoprefixer": "^10.4.14",
        "postcss": "^8.4.23",
        "tailwindcss": "^3.3.2"
    }
}
```

### <span style="color:#FFA559">Setup file `postcss.config.cjs`</span>

```cjs
const config = require("./tailwind.config.cjs");

module.exports = {
  plugins: {
    // Specifying the config is not necessary in most cases, but it is included
    // here to share the same config across the entire monorepo
    tailwindcss: { config },
    autoprefixer: {},
  },
};
```

### <span style="color:#FFA559">Setup file `tailwind.config.cjs`</span>

Nel file di configurazione di Tailwind oltre alle proprietà classiche estendo la proprietà color aggiungendo un nuovo colore alla palette fornita:

La colorazione è denominata **board** ed è caratterizzata da due colorazioni:
- ![#323946](https://placehold.co/15x15/323946/323946.png) `#323946`
- ![#1f242d](https://placehold.co/15x15/1f242d/1f242d.png) `#1f242d`

```cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "**/*/index.html",
    "**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'board':{
            DEFAULT:'#323946',
            dark:'#1f242d'
        }
      }
    },
  },
  plugins: [],
}
```

Attraverso il gestore dei pacchetti `pnpm` includo la mia configurazione newi progetti della **monorepo** con un comando che ha laseguente sintassi:

>**⚠️ _SINTASSI COMANDO:_** userapp corrisponde al nome dato al progetto preso in esempio durante il setup della monorepo al passo 3.

```sh
pnpm userapp add @demo/tailwind-config@workspace:*
```

Il risultato che ottengo nel `package.json` del progetto `user-manage-app` è il seguente:

>**⚠️ _NB:_** Se la dipendenza viene inserità nella proprietà `"dependencies"` spostarla nella proprietà `devDependencies`.

```JSON
{
  "name": "@demo/user-manage-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@demo/tailwind-config": "workspace:^", /* dependencies added */
    "@vitejs/plugin-vue": "^4.1.0",
    "vite": "^4.3.2",
    "vue-tsc": "^1.4.2"
  }
}
```

Ora non ci resta che inserire i file di configurazione di tailwind nel progetto dove vogliamo utlilizzarlo in modo tale che ogni file faccia riferimento al medesimo file presente nella nel package di configurazione.

Il risultato dovrebbe essere questo:

`user-manage-app/postcss.config.cjs`
```cjs
module.exports = require('@demo/tailwind-config/postcss.config.cjs')
```

`user-manage-app/tailwind.config.cjs`
```cjs
module.exports = require('@demo/tailwind-config/tailwind.config.cjs')
```


Ultimo ma non meno importante bisogna ricordarci di importare le direttive di Tailwind nel foglio di stile principale del progetto:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```



















