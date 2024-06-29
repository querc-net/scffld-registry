# Contributing

See [templates documentation](https://github.com/lindsayevans/scffld/blob/develop/docs/templates.md)

## Basic workflow

1. Create initial template structure in `./src/`
2. Tidy up any files you don't want included (e.g. `package-lock.json`)
3. Generate an initial template file:

```sh
npx @querc/scffld@latest # Ensure latest is installed
npx @querc/scffld@latest generate ./src/ > templates/parcel-react-app.md
```

4. Add any required params & directives to your template

   > [!WARNING]
   > All `filename`s will be prefixed with `src/`, so you'll probably want to strip those out

5. Test your template - be sure to test out all options:

```sh
npx @querc/scffld@latest templates/parcel-react-app.md
npx @querc/scffld@latest templates/parcel-react-app.md --outputDirectory=./test-src/ --name="My Test Thing" --packageManager=pnpm
npx @querc/scffld@latest templates/parcel-react-app.md --outputDirectory=./test-src/ --name="My Test Thing" --packageManager=yarn --includeTests=false --includeRouter=false --includeMantine=false --includeFonts=false --includeIcons=false
```

## Best practices

- Include an `outputDirectory` param
- Include usage instructions, e.g:

```sh
npx @querc/scffld@latest reg:parcel-react-app \
    --outputDirectory=./PROJECT_NAME/
```
