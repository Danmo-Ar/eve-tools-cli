# Everest Dev CLI

This CLI tool helps start new projects faster with prebuilt and preconfigured architectures, bundled with reusable components and utilities.

## Installation

Install the CLI tool globally using npm:

```bash
npm install -g @eve-tools/cli
```

If you encounter permission issues, try using `sudo`:

```bash
sudo npm install -g @eve-tools/cli
```

## Verification

Verify the installation by running the base command, which displays the help information:

```bash
eve
```

## Usage

### Display Help

Shows all available commands and options.

```bash
eve --help
```

or simply:

```bash
eve
```

### Initialize a New Project (`init`)

This command scaffolds a new project. You can either follow the interactive prompts or provide flags for a quicker setup.

**Interactive Mode:**

Starts a series of prompts to configure your project (name, type, architecture, language, framework).

```bash
eve init
```

You can also specify the project name directly, and it will still use interactive prompts for the rest:

```bash
eve init my-awesome-project
```

If you want to initialize in the current directory, use `.`:

```bash
eve init .
```

**Using Flags (Shortcut):**

Bypass interactive prompts by providing flags. If flags are used, the CLI validates the combination based on available templates.

**Available Flags:**

-  `-t, --type <type>`: Project type (`frontend` or `backend`/`b`). Defaults to `frontend`.
-  `-a, --arch <architecture>`: Project architecture. Defaults to `application` for frontend, `crud` for backend.
   -  Frontend currently supports: `application`
   -  Backend currently supports: `crud`
-  `-l, --lang <language>`: Programming language. Defaults to `ts` for frontend, `node` for backend.
   -  Frontend currently supports: `ts`
   -  Backend currently supports: `node`
-  `-f, --framework <framework>`: Project framework. Defaults to `next` for frontend, `nestjs` for backend.
   -  Frontend currently supports: `next`
   -  Backend currently supports: `nestjs`

**Examples with Flags:**

-  Initialize a default Frontend project (Application, TypeScript, Next.js) named `my-frontend-app`:

   ```bash
   eve init my-frontend-app
   ```

   _(Note: Since frontend is the default, no `-t` flag is needed)_

-  Initialize a default Backend project (CRUD, Node.js, NestJS) named `my-backend-api`:

   ```bash
   eve init my-backend-api -t backend
   ```

   or using the short flag:

   ```bash
   eve init my-backend-api -t b
   ```

-  Initialize a default Frontend project in the current directory:

   ```bash
   eve init .
   ```

-  Explicitly define a Frontend project:

   ```bash
   eve init my-next-project -t frontend -a application -l ts -f next
   ```

-  Explicitly define a Backend project:
   ```bash
   eve init my-nest-project -t backend -a crud -l node -f nestjs
   ```

**Using `npx`:**

You can also run the `init` command without global installation using `npx`:

```bash
npx @eve-tools/cli init [name] [options]
```

Example:

```bash
npx @eve-tools/cli init my-temp-project -t backend
```

### Upgrade CLI (`upgrade`)

Checks for the latest version of `@eve-tools/cli` and upgrades if a newer version is available.

```bash
eve upgrade
```

### Check for Updates (`check-update`)

Manually checks if a newer version of the CLI is available without performing the upgrade.

```bash
eve check-update
```

## More Features (In Progress)

-  **Add Command**: Generate components, services, modules, etc., based on the project's architecture.
-  **UI Component Library**: Predefined UI components for frontend development.

_We'll add more features as we go!_
