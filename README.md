# Everest Dev CLI

This CLI tool should help us start new projects faster, with prebuilt and preconfigured architecture bundled with some extra reusable components (UI components, helper functions, etc.).

## Installation guide

### Install the CLI tool globally

```bash
npm i -g @eve-tools/cli
```

if granted permission issue, try with sudo

```bash
sudo npm i -g @eve-tools/cli
```

### Verify the installation

```bash
eve
```

this command directly output the cli help to have glimpse of commands and options.

### Initialize the project by following the prompt

>

```bash
eve init
```

or

```bash
    npx @eve-tools/cli init
```

prompt will ask for project name, language, and framework to use.
we actually work on shortcut with option to skip prompt and directly initialize project with default values.

> ### More Features : In Progress

> - **Init Function**:Initialize a new project based on boilerplate (Frontend, Backend) depending on the chosen language and framework.

> - **Add Command**: Based on the generated JSON configuration, add UI components, workflows, or reusable functions to the current project.

> - **Big Components UI**: Predefined UI components for frontend development to speed up the project process. from atom components to comlplex organisms.

> - _We'll add more feature as we going_
