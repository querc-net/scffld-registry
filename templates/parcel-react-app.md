---
outputDirectory: ./src/
name: Parcel React app
description: Creates a basic React / Parcel app
keywords: [react, parcel, app]
props:
  name:
    type: string
    required: true
  packageManager:
    type: list
    default: npm
    options:
      - npm
      - yarn
      - pnpm
  includeTests:
    type: boolean
    default: true
    description: Include unit tests
  includeRouter:
    type: boolean
    default: true
    description: Include React Router
  includeMantine:
    type: boolean
    default: true
    description: Include Mantine UI component library
  includeFonts:
    type: boolean
    default: true
    description: 'Include Google Fonts: Roboto Slab, Inter'
  includeIcons:
    type: boolean
    default: true
    description: Include Bootstrap Icons

postInstallCommands:
  - git init
  - ${ @scffld packageManager } install
  - ${ @scffld packageManager } run prettier

postInstallMessage: |
  ___
  # Your React app '<!-- @scffld name -->' has been created!
  \
  To get started, run the following commands:
  ```sh
  cd <!-- @scffld-outputDirectory -->
  <!-- @scffld packageManager --> install
  <!-- @scffld packageManager --> start
  ```
---

# Parcel React app template

<!-- @scffld-usage-start -->

Highly opinionated template for creating a React app using Parcel.js

## Usage

```sh
npx @querc/scffld@latest reg:parcel-react-app \
  --name="Your Project Name" \
  --outputDirectory=./PROJECT_NAME/
```

To see all available options:

```sh
npx @querc/scffld@latest reg:parcel-react-app --help
```

<!-- @scffld-usage-end -->

## Template files

```txt { filename: '.gitignore' }
node_modules
.parcel-cache
dist
```

````md { filename: 'README.md' }
# <!-- @scffld name -->

> Created with [scffld](https://www.npmjs.com/package/@querc/scffld) and the [React web app template](https://github.com/querc-net/scffld-registry/blob/main/templates/parcel-react-app.md)

## Setup

Corepack is optional - see https://nodejs.org/api/corepack.html#corepack for details

```sh
corepack enable && corepack use <!-- @scffld packageManager -->@latest
<!-- @scffld packageManager --> install
```

## Local development

```sh
<!-- @scffld packageManager --> start
```

App will be available at: http://localhost:1234

<!-- @scffld-if includeTests -->

## Testing

```sh
<!-- @scffld packageManager --> test
<!-- @scffld packageManager --> test -- --watch
```

<!-- @scffld-endif -->

## Linting

```sh
<!-- @scffld packageManager --> run lint
<!-- @scffld packageManager --> run lint:fix
```

## Production build

```sh
<!-- @scffld packageManager --> run build
```

Files will be in: `./dist/`

## Features

### Code generation

```sh
<!-- @scffld packageManager --> run g:component -- --name="My Thing"
```

Uses [scffld](https://www.npmjs.com/package/@querc/scffld) to generate React components

To see all available options:

```sh
<!-- @scffld packageManager --> run g:component -- --help
```

<!-- @scffld-if includeTests -->

## Unit Testing

With [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

<!-- @scffld-endif -->
<!-- @scffld-if includeRouter -->

### [React Router](https://reactrouter.com/)

<!-- @scffld-endif -->
<!-- @scffld-if includeMantine -->

### [Mantine UI component library](https://mantine.dev/)

Including a [theme switcher component](./src/components/ThemeToggle)

<!-- @scffld-endif -->
<!-- @scffld-if includeIcons -->

### [Bootstrap Icons](https://icons.getbootstrap.com/)

via [React Bootstrap Icons](https://www.npmjs.com/package/react-bootstrap-icons)

<!-- @scffld-endif -->
````

```mjs { filename: 'eslint.config.mjs', condition: includeTests }
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { settings: { react: { version: 'detect' } } },
  { files: ['**/*.{ts,tsx}'] },
  { ignores: ['**/*.test.{ts,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
];
```

```js { filename: 'jest.config.js', condition: includeTests }
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
```

```js { filename: 'jest.setup.js', condition: includeTests }
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
```

```json { filename: 'package.json' }
{
  "name": "/* @scffld-kebab name */",
  "version": "0.0.0",
  "description": "/* @scffld name */",
  "source": "src/index.html",
  "scripts": {
    "start": "parcel src/index.html",
    "build": "parcel build src/index.html",
    "clean": "rm -rf dist && rm -rf .parcel-cache",
    /* @scffld-if includeTests */
    "test": "jest",
    /* @scffld-endif */
    "lint": "eslint ./src/",
    "lint:fix": "eslint --fix ./src/",
    "prettier": "prettier --write .",
    "g:component": "scffld reg:react-component --includeTests=/* @scffld includeTests */ --outputDirectory=./src/components/"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["pretty-quick --staged", "eslint --fix", "git add"],
    "*.{scss}": ["pretty-quick --staged", "git add"]
  },
  "devDependencies": {
    "@eslint/js": "^9.6.0",
    "@parcel/transformer-sass": "^2",
    "@querc/scffld": "^1.4.0",
    /* @scffld-if includeTests */
    "@testing-library/dom": "^10.2.0",
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@types/jest": "^29.5.12",
    /* @scffld-endif */
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.3",
    "globals": "^15.6.0",
    "husky": "^9.0.11",
    /* @scffld-if includeTests */
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    /* @scffld-endif */
    "lint-staged": "^15.2.7",
    "parcel": "^2",
    "postcss": "^8.4.38",
    "postcss-preset-mantine": "^1.15.0",
    "postcss-simple-vars": "^7.0.1",
    "prettier": "^3",
    "pretty-quick": "^4.0.0",
    "process": "^0.11.10",
    /* @scffld-if includeTests */
    "ts-jest": "^29.1.5",
    /* @scffld-endif */
    "typescript": "^5",
    "typescript-eslint": "^7.14.1"
  },
  "dependencies": {
    /* @scffld-if includeMantine */
    "@mantine/core": "^7.11.0",
    "@mantine/hooks": "^7.11.0",
    /* @scffld-endif */
    "clsx": "^2.1.1",
    "react": "^18",
    /* @scffld-if includeIcons */
    "react-bootstrap-icons": "^1.11.4",
    /* @scffld-endif */
    "react-dom": "^18",
    /* @scffld-if includeRouter */
    "react-router-dom": "^6.24.0"
    /* @scffld-endif */
  }
}
```

```json { filename: 'tsconfig.json' }
{
  "compilerOptions": {
    "target": "es2016",
    "jsx": "react-jsx",
    "module": "commonjs",
    /* @scffld-if includeTests */
    "types": ["jest"],
    /* @scffld-endif */
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

```tsx { filename: 'src/App.test.tsx', condition: includeTests }
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';

import { App } from './App';

describe('App component', () => {
  test('displays heading', async () => {
    render(<App />);

    const heading = screen.getByText(/^Welcome to/, { selector: 'h2' });

    expect(heading).toHaveTextContent('Welcome to /* @scffld name */!');
  });

  test('displays config', async () => {
    render(<App config={{ foo: 'test' }} />);

    await screen.findByRole('code');

    expect(screen.getByRole('code')).toHaveTextContent('"foo": "test"');
  });
});
```

```tsx { filename: 'src/App.tsx' }
import React from 'react';
/* @scffld-if includeMantine */
import { Container, createTheme, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'cyan',
});
/* @scffld-endif */
import { Config } from './Config';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';

export type AppProps = { config?: Config };

export const App: React.FC<AppProps> = (props) => {
  const { config } = props;

  return (
    /* @scffld-if includeMantine */
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Container size="lg">
    /* @scffld-else */
      <>
    /* @scffld-endif */
        <h2>Welcome to /* @scffld name */!</h2>

        <h3>Config</h3>
        {config && <pre role="code">{JSON.stringify(config, null, 2)}</pre>}

    /* @scffld-if includeMantine */
        <h3>Toggle theme</h3>
        <ThemeToggle />
      </Container>
    </MantineProvider>
    /* @scffld-else */
      </>
    /* @scffld-endif */
  );
};
```

```ts { filename: 'src/Config.ts' }
/** App configuration */
export type Config = {
  /** Does something... */
  foo: string;
  /** Does something else... */
  bar?: boolean;
};
```

```html { filename: 'src/index.html' }
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title><!-- @scffld name --></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ccc" />
    <meta name="description" content="<!-- @scffld name -->" />

    <link rel="icon" type="image/svg+xml" href="./images/favicon.svg" />
    <link rel="icon" type="image/png" href="./images/favicon.png" />
    <!-- @scffld-if includeFonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto+Slab:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <!-- @scffld-endif -->

    <link rel="stylesheet" href="./main.scss" />
  </head>
  <body>
    <header>
      <h1>
        <!-- @scffld name -->
        <img
          class="logo"
          src="./images/logo.svg"
          width="64"
          height="64"
          alt=""
        />
      </h1>
    </header>

    <div class="app" data-config='{"foo":"bar"}'></div>

    <script type="module" src="./main.tsx"></script>
  </body>
</html>
```

```scss { filename: 'src/main.scss' }
@use './design-system/colours';
@use './design-system/typography';

body {
  font-family: var(--font-body);
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 0.25rem 0;
  background-color: var(--brand-primary);
  color: #fff;

  h1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
    max-width: calc(71.25rem * var(--mantine-scale));
    padding: 0 var(--mantine-spacing-md);
    margin: 0;
    color: inherit;

    .logo {
      transform: scale(1.5);
      transform-origin: top;
    }
  }
}

h1,
h2,
h3 {
  font-family: var(--font-heading);
  color: var(--brand-primary);
}
```

```tsx { filename: 'src/main.tsx' }
import React, { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { App } from './App';

const $apps = document.querySelectorAll<HTMLElement>('.app');
$apps.forEach(($app) => {
  const root = createRoot($app);
  const config = $app.dataset.config
    ? JSON.parse($app.dataset.config)
    : undefined;

  root.render(
    <StrictMode>
      <App config={config} />
    </StrictMode>
  );
});
```

```ts { filename: 'test-utils/index.ts', condition: includeTests }
// import userEvent from '@testing-library/user-event';

export * from '@testing-library/react';
export { render } from './render';
// export { userEvent };
```

```tsx { filename: 'test-utils/render.tsx', condition: includeTests }
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider>{children}</MantineProvider>
    ),
  });
}
```

```scss { filename: 'src/design-system/_colours.scss' }
$brand-primary: teal;
$brand-secondary: salmon;

:root {
  --brand-primary: #{$brand-primary};
  --brand-secondary: #{$brand-secondary};
}
```

```scss { filename: 'src/design-system/_typography.scss' }
$font-body: 'Inter', sans-serif;
$font-heading: 'Roboto Slab', serif;

:root {
  --font-body: #{$font-body};
  --font-heading: #{$font-heading};
}
```

```base64 { filename: 'src/images/favicon.png' }
iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAy1JREFUaEPVWs1qFEEQrhph40V8AYXgwZN3I4jmEnwBBfGir+CYk0m0Y4ynEF9BLyKYB1ByiSIk3j3lEALxARQv7gSnpXapsWmmd6q6e1a3YVjYmamqr+qr6p8ahJZRPVu+irVdqsFeLxAWrIXzbc/1/R8i/KgtHBSAn22Bu4MnW198nej+8cuUlxHsfQS8CwCX+jZQKf/Ign1rAV+fNduH/G4DYGiWrxRgn1qwt5WCp/o4Au7UgOtzZusrKR4BIM+fAdz8343/63Xc+Q12hSIxAjA0DzcR8HGqK39WFZwbDFLFiN63YF/MmZcrSAkLdf0mB+eXXr1rlO8+uCMyJOGhIyiKe3hqHq1asBsJgppXN/b2gS4ea4vXgK6+BgKu4dCU7xHgVg4lPgCSeXP+IvQVDQvwAU/Xy++56vzH4xNwacRO6QsEzRNYmdLm8D7JCAGge33RaWoA+gKRFUBbDvjRrUyZK+AjOVkBEP+JRpNGbiplAzCJ/31GIRsAifcZCJVVqkw5RhYAGu/7yUzvpoDJAkDjfR8Avbu6uBANIhmA1nh/duaJL3a2TgIQY7wLwKVebHWKBhBrPFOIft2FX+xEFwUgxXiOQGi+0E50agCpxneVTi2VVAC05dKlhQa4JgoqABoj2spl1zIjZqITA9B636eCBryGRmIAGgPIk/5yQbJSjdkAiQEMzHZX/jX3QzswjQxpHogASOlDoSdPhyigiYJ0wZcNABtNVLsxfyF4GiEFMXUAHHKuNJNWmBIQ0kQWRaBLYcypQ1c+TDUCUmVuFehyilSmKAJdSSytGC6ALplZAZDiUMhj6MNAJtFI6hRRBHjp6y9/2RCpMn8iCU2OGqf8UwChCEjpoz4XCiWeRiFHIdc5qjgCpDikVFqzXQqF6KN1hgrApFzQgAhFUiODnRF1vB4yQJJ8WY2n4/XYBgfR6fneQetZKAGh9RBdND4dfxv9hqpYjOdJ3rjBkdhiIqPIQOluy82DWMMb+lCLKVeTjyPCyd62eeDI8HZTvMFof3Dc5KN7udqsvh5qu9Loo/XatFlJwcw3usdRmOFPDTj0M/2xh8vfWfrc5g9tk1/9L1ceHwAAAABJRU5ErkJggg==
```

```svg { filename: 'src/images/favicon.svg' }
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
    <rect width="1000" height="1000" rx="200" ry="200" fill="#fa8072"></rect>
    <g transform="matrix(50,0,0,50,100,100)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="teal" viewBox="0 0 16 16">
            <path
                d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15">
            </path>
        </svg>
    </g>
</svg>

```

```svg { filename: 'src/images/logo.svg' }
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fa8072" viewBox="0 0 16 16">
    <path
        d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15">
    </path>
</svg>

```

```scss { filename: 'src/components/ThemeToggle/ThemeToggle.scss', condition: includeMantine }
.theme-toggle {
  &__icon {
    width: 24px;
    height: 24px;
  }
}

[data-mantine-color-scheme='light'] {
  .theme-toggle {
    &__icon {
      &--light {
        display: none;
      }
      &--dark {
        display: block;
      }
    }
  }
}

[data-mantine-color-scheme='dark'] {
  .theme-toggle {
    &__icon {
      &--light {
        display: block;
      }
      &--dark {
        display: none;
      }
    }
  }
}
```

```tsx { filename: 'src/components/ThemeToggle/ThemeToggle.tsx', condition: includeMantine }
import React from 'react';
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import cx from 'clsx';
/* @scffld-if includeIcons */
import { CloudSun, CloudMoon } from 'react-bootstrap-icons';
/* @scffld-endif */

const baseClass = 'theme-toggle';

import './ThemeToggle.scss';

export const ThemeToggle: React.FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
      className={baseClass}
    >
      /* @scffld-if includeIcons */
      <CloudSun
        className={cx(`${baseClass}__icon`, `${baseClass}__icon--light`)}
      />
      <CloudMoon
        className={cx(`${baseClass}__icon`, `${baseClass}__icon--dark`)}
      />
      /* @scffld-endif */
    </ActionIcon>
  );
};
```
