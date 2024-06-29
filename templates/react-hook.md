---
outputDirectory: ./src/hooks/
props:
  name:
    type: string
    required: true

postInstallMessage: |
  ___
  # Your React hook '<!-- @scffld name -->' has been created!
  \
  <!-- @scffld-outputDirectory -->use<!-- @scffld-pascal name -->.ts
  \
  You can use it like so:
  ```tsx
  use<!-- @scffld-pascal name -->(true);
  ```
---

# React hook template

## Usage

```sh
npx @querc/scffld@latest reg:react-hook \
  --name="Your Hook Name"
```

By default will output to `./src/hooks/useYourHookName.ts` - to override add `--outputDirectory=./your/hooks/path/`

## Template files

<!-- prettier-ignore-start -->

```ts { filename: 'use${ @scffld-pascal name }.ts' }
import { useState, useEffect } from 'react';

export const use/* @scffld-pascal name */ = (defaultValue?: boolean) => {
  const [is/* @scffld-pascal name */, setIs/* @scffld-pascal name */] = useState(defaultValue);

  useEffect(() => {
    const handleOnline = () => {
      setIs/* @scffld-pascal name */(true);
    };

    const handleOffline = () => {
      setIs/* @scffld-pascal name */(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return is/* @scffld-pascal name */;
};

```
<!-- prettier-ignore-end -->
