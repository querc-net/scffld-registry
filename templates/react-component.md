---
outputDirectory: ./src/components/
name: React component
description: Creates a basic React component
keywords: [react, component]
authors: [lindsayevans]
props:
  name:
    type: string
    required: true
  includeTests:
    type: boolean
    default: true
    description: Include unit tests
  includeStyle:
    type: boolean
    default: true
    description: Include stylesheet

postInstallMessage: |
  ___
  # Your React component '<!-- @scffld name -->' has been created!
  \
  You can use it like so:
  ```tsx
  <<!-- @scffld-pascal name --> />
  ```
---

# React component template

<!-- @scffld-usage-start -->

Highly opinionated template for creating React components

## Usage

```sh
npx @scffld/cli@latest reg:react-component \
  --name="Your Component Name"
```

By default will output to `./src/components/YourComponentName/` - to override add `--outputDirectory=./your/component/path/`

To see all available options:

```sh
npx @scffld/cli@latest reg:react-component --help
```

<!-- @scffld-usage-end -->

## Template files

```scss { filename: '${ @scffld-pascal name }/${ @scffld-pascal name }.scss', condition: includeStyle }
./* @scffld-kebab name */ {
  &--active {
    outline: 1px solid salmon;
    outline-offset: 2px;
  }

  &__title {
  }
}
```

```tsx { filename: '${ @scffld-pascal name }/${ @scffld-pascal name }.test.tsx', condition: includeTests }
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '../../../test-utils';

import { /* @scffld-pascal name */ } from './/* @scffld-pascal name */';

describe('/* @scffld-pascal name */ component', () => {
  test('displays heading', async () => {
    render(</* @scffld-pascal name */ />);

    const heading = screen.getByText(/^Hello from/, { selector: 'h3' });

    expect(heading).toHaveTextContent('Hello from /* @scffld name */!');
  });

  test('displays active state', async () => {
    const { container } = render(</* @scffld-pascal name */ active={true} />);

    const component = container.querySelector('./* @scffld-kebab name */');

    expect(component?.classList.contains('/* @scffld-kebab name */--active')).toBe(
      true
    );
  });
});
```

```tsx { filename: '${ @scffld-pascal name }/${ @scffld-pascal name }.tsx' }
import React, { useState } from 'react';
import cx from 'clsx';

const baseClass = '/* @scffld-kebab name */';
/* @scffld-if includeStyle */
import './/* @scffld-pascal name */.scss';
/* @scffld-endif */

export type /* @scffld-pascal name */Props = {
  active?: boolean;
};

export const /* @scffld-pascal name */: React.FC</* @scffld-pascal name */Props> = (props) => {
  const [active, setActive] = useState(props.active);

  const toggleState = () => {
    setActive(!active);
  };

  return (
    <div className={cx(baseClass, active && `${baseClass}--active`)}>
      <h3 className={`${baseClass}__title`}>Hello from /* @scffld name */!</h3>
      <button type="button" onClick={() => toggleState()}>
        Toggle state
      </button>
    </div>
  );
};
```
