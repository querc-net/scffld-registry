# Contributing

See [templates documentation](https://github.com/scffld-dev/cli/blob/develop/docs/templates.md)

## Basic workflow

1. Create initial template structure in `./src/`
2. Tidy up any files you don't want included (e.g. `package-lock.json`)
3. Generate an initial template file:

```sh
npx @scffld/cli@latest # Ensure latest is installed
npx @scffld/cli@latest generate ./src/ --basePath=src/ > templates/react-parcel-app.md
```

4. Add any required params & directives to your template

5. Test your template - be sure to test out all options:

```sh
npx @scffld/cli@latest templates/react-parcel-app.md
npx @scffld/cli@latest templates/react-parcel-app.md --outputDirectory=./test-src/ --name="My Test Thing" --packageManager=pnpm
npx @scffld/cli@latest templates/react-parcel-app.md --outputDirectory=./test-src/ --name="My Test Thing" --packageManager=yarn --includeTests=false --includeRouter=false --includeMantine=false --includeFonts=false --includeIcons=false
```

## Best practices

- Include an `outputDirectory` param
- Wrap template code blocks in `<!-- prettier-ignore-start -->` / `<!-- prettier-ignore-end -->` so they don't get formatted by Prettier
- Include usage instructions, e.g:

```sh
npx @scffld/cli@latest reg:react-parcel-app \
    --outputDirectory=./PROJECT_NAME/
```

- Include author param - arrayr of GitHub usernames
- Wrap usage details etc. in `<!-- @scffld-usage-start -->` / `<!-- @scffld-usage-end -->` to get them to display in the web interface
- Name, description & keywords are currently unused, but may be exposed in the wb interface in the future
