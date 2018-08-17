---
layout: post
title: React app code splitting with React-Loadable dynamic imports, using TypeScript and WebPack
description: "A few setting changes were needed in order to get my react app code-splitting properly in a project with TypeScript and WebPack"
modified: 2018-08-11
tags: [react, web]
categories: [development]
#image:
#    feature: abstract-4.jpg
---

Recently I added code splitting and dynamic imports to a React + TypeScript + WebPack project using [React Loadable](https://github.com/jamiebuilds/react-loadable). However, it took a few hours to work though getting the JS chunks to properly split rather than get bundled together into a single chunk.


[React Loadable](https://github.com/jamiebuilds/react-loadable) looks like it requires minimal configuration to work, and TypeScript claims to have out-of-the-box support for dynamic imports. Perhaps with Create React App this is the case, but in existing larger codebases that use WebPack, I had to make some changes, which I'll highlight below the pasted code.

Stack used here:
- React 16
- TypeScript 3
- WebPack 4


####React TSX Class:


```$javascript
import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Icon, message, Spin } from 'antd';
...

interface HasDynamicImportProps {
    propThing: type
}

interface HasDynamicImportState {
  loadableComponent: type
}

export class HasDynamicImport extends React.Component<HasDynamicImportProps, HasDynamicImportState> {

  constructor(props) {
    super(props);
    this.state = {
      loadableComponent: null,
    };
  }
  
  private readonly ANT_ICON = <Icon type='loading' style={{ fontSize: 24 }} spin/>;

  public async componentDidUpdate(previousProps, previousState) {
    /* this component responds to inputs but that is omitted for simplicity */
    this.setAsyncComponent();
  }

  public setAsyncComponent() {
    const loadableGrapesInstanceComponent = Loadable.Map({
      loader: {
        AsyncComponentImport: () => {
          return import( /* webpackChunkName: "ComponentWrapper" */ '../components/AsyncComponent');
        },
      },
      loading: () => {
        return null;
      },
      render(loaded, props: any) {
        const Component = loaded.AsyncComponentImport.AsyncComponent;
        const propThing = props.propThing;
        return <Component
          propThing={propThing}
        />;
      },
    });
    this.setState({ loadableComponent });
  }

  public render() {
    if (!this.state.loadableComponent) {
      return (
        <div className='flex h-full w-full justify-center'>
          <Spin indicator={this.ANT_ICON} className='mt-8 mb-8'/>
        </div>);
    }
    return (
      <section id='grapesjs-container'>
        <article className='w-screen'>
          <this.state.loadableGrapesInstanceComponent
            propThing={this.props.propThing}
          />
        </article>
      </section>
    );
  }
}

```

Highlights from above:
- Note how `this.state.loadableComponent` is used to house the loadable component, rather than declaring it as a `const` outside the class. If declared outside the class as shown in other docs, it exists in memory when you don't want it to.
- My example above intentionally does not load a `Loading...`component but you can do that. The `Map` is also being used to transfer props. See [React Loadable](https://github.com/jamiebuilds/react-loadable) docs.
- Note how I am importing things, by referencing the exports. TypeScript imports modules a little differently than your typical CRA JS.
- This handles the passing of internal class values via props, where the props are passed in first through the `render`. This guards against passing in `undefined` props on load
- The inline comment  `/* webpackChunkName: "ComponentWrapper" */` has a purpose: It tells webpack to code-split this under this chunk name


But what if its compiling fine, but your `return import( /* webpackChunkName: "ComponentWrapper" */ '../components/AsyncComponent');` is getting compiled right into the main bundle, and isn't being split out as it should be?

You *should* see something like
```
                                main.0cf7b02de965f7714959.package.js   X KiB                    main  [emitted]  main
              vendor~ComponentWrapper.0cf7b02de965f7714959.package.js  X MiB  vendor~GrapesJSWrapper  [emitted]  vendor~ComponentWrapper
                         vendor~main.0cf7b02de965f7714959.package.js  X MiB             vendor~main  [emitted]  vendor~main
                                                          index.html  1.81 KiB                          [emitted]  
```

What if you don't? What if you're only seeing `main` or a single `vendor` with `main`? The webpack comment should show up in the list here as a chunk, as it does above.

***If you aren't seeing the above, keep reading...***

First, verify your webpack config:

`webpack.web.config.js'
```$xslt
const baseConfig = {/* your other bits */
const plugins = [
  new HtmlWebpackPlugin({
    template: projectRoot + '/src/index.html',
  }),
];
const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [['@babel/preset-env']],
    comments: true,
    compact: false,
    plugins: ['@babel/plugin-syntax-dynamic-import']
  },
};
module.exports = merge.smart(baseConfig, {
  entry: {
    main: './src/main.tsx'
  },
  module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [babelLoader, { loader: 'ts-loader' }],
        },
  },
  output: {
    path: projectRoot + '/dist',
    filename: '[name].[hash].package.js',
    chunkFilename: "[name].[hash].package.js",
    publicPath: '/',
  },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    chunks: 'all',
                    test: /node_modules/
                }
            }
        }
    },
  plugins,
});
```

Notes on above:
- `babelLoader` has the `@babel/plugin-syntax-dynamic-import` plugin
- Some of the optimizations may not be needed in your case, but this webpack config enables the WebPack 4 almost-automatic code splitting to take place. For me, this also splits out fonts automatically.
- `HtmlWebpackPlugin` is set to automatically append the relevant JS chunks onto `index.html` with this config

Second, is your `tsconfig` correct? It should be using `esnext`

`tsconfig.json`
```$xslt
{
  "compileOnSave": false,
  "compilerOptions": {
    "jsx": "react",
    "sourceMap": true,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "target": "es5",
    "module" : "esnext",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "ES2017",
      "DOM",
      "DOM.Iterable"
    ]
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
      "**/*.history"
  ]
}

```
If this is set to `commonjs` instead of `esnext`, dynamic imports will not work and will just get compiled into one of the other chunks. Be warned that `esnext` is a little experiemental at the time of this writing, and it may interfere with some of your other imports but I was able to work through those just by toggling my `import` or `require` syntax as needed in other files.
