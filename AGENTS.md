# AGENTS.md

## Tech Stack
- React
- TypeScript
- Vite
- MUI for styling
- Apollo Client for GraphQL

## Coding Preferences
- Use functional React components
- Prefer TypeScript interfaces over types when practical
- Keep components small and reusable
- Use descriptive variable names
- Add comments for non-obvious logic
- Avoid unnecessary abstractions

## Project Structure
- Place reusable UI in src/components
- Place pages in src/pages
- Place GraphQL logic in src/graphql
- Place shared utilities in src/utils

## Styling
- Use MUI components first before custom CSS
- Prefer sx prop for component-level styling
- Avoid inline styles unless necessary

## React Patterns
- Prefer composition over prop drilling
- Use custom hooks for reusable logic
- Keep page components thin
- Avoid deeply nested component trees

## TypeScript
- Avoid using any
- Prefer explicit return types for exported functions
- Reuse shared interfaces when possible

## Apollo / GraphQL
- Keep GraphQL queries in dedicated files
- Use generated types when available
- Handle loading and error states in all queries

## File Editing Rules
- Do not rewrite entire files unless necessary
- Preserve existing formatting and structure
- Explain why changes are needed before applying them

## Beginner-Friendly Behavior
- Explain unfamiliar concepts briefly
- Prefer simpler implementations over advanced patterns
- Avoid overengineering

## Workflow
- Explain planned changes before editing
- Make small incremental changes
- Do not install dependencies without asking
- Show diffs before large refactors
- Prefer minimal changes over rewrites

## Commands
- Use yarn
- Verify changes with:
  - yarn dev
  - yarn build
  - yarn lint

## Runtime / Sandbox Environment

Before running any yarn, vite, lint, or build commands:

```bash
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"
```

Verify Node version:

```bash
node -v
```

Expected:

```bash
v24.16.0
```

When starting the Vite dev server:

```bash
yarn dev --host 0.0.0.0
```

If sandbox localhost/socket permission is requested, approve it.

If sandbox localhost permission is rejected:
- do not retry repeatedly
- continue with build/lint validation only
- ask the user to run the dev server locally