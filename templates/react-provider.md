---
outputDirectory: ./src/providers/
name: React provider
description: Creates a basic React provider
keywords: [react, provider]
props:
  name:
    type: string
    required: true
postInstallMessage: |
  ___
  # Your React provider '<!-- @scffld name -->' has been created!
  \
  <!-- @scffld-outputDirectory --><!-- @scffld-pascal name -->Provider.tsx
  \
  You can use it like so:

  ```tsx
  <<!-- @scffld-pascal name -->Provider>
     ...
  </<!-- @scffld-pascal name -->Provider>
  ```

  ```tsx
  const { <!-- @scffld-camel name -->, set<!-- @scffld-pascal name --> } = use<!-- @scffld-pascal name -->(<!-- @scffld-pascal name -->Context);

  ```
---

# React provider template

<!-- @scffld-usage-start -->

## Usage

```sh
npx @querc/scffld@latest reg:react-provider \
  --name="Your Provider Name"
```

By default will output to `./src/providers/YourProviderName.tsx` - to override add `--outputDirectory=./your/providers/path/`

<!-- @scffld-usage-end -->

## Template files

<!-- prettier-ignore-start -->

```tsx { filename: '${ @scffld-pascal name }Provider.tsx' }
import React, { useState, createContext } from 'react';

export const /* @scffld-pascal name */Context = createContext('light', () => 'light');

export const /* @scffld-pascal name */Provider = ({ children }) => {
  const [someThing, set/* @scffld-pascal name */] = useState('light');

  return (
    </* @scffld-pascal name */Context.Provider value={{ someThing, set/* @scffld-pascal name */ }}>
      {children}
    <//* @scffld-pascal name */Context.Provider>
  );
};
```
<!-- prettier-ignore-end -->
