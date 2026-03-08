---
name: developer-typescript
description: Type-safe TypeScript: narrowing, inference, generics, strict mode, utility types, declarations, migration.
triggers: "ts, typescript"
---

# Developer TypeScript

Use when the user needs TypeScript help: typing, narrowing, generics, strict mode, declaration files, or migration from JS.

## Stop using `any`

- Use `unknown` and narrow before use; `any` skips type safety. Type API responses or use `unknown`; never `any`. Prefer `unknown` from the start.

## Narrowing

- `filter(Boolean)` does not narrow; use `.filter((x): x is T => Boolean(x))`.
- `Object.keys(obj)` is `string[]`, not `keyof typeof obj`.
- `Array.isArray()` narrows to `any[]`; may need assertion for element type.
- `in` narrows only when the property is in exactly one branch of the union.

## Literal types

- `let x = "hello"` is `string`; use `const` or `as const` for a literal. Object properties widen; use `as const` or type annotation. `<T extends string>` with a literal infers `string`, not the literal.

## Inference

- Callbacks lose inference in some array methods; annotate when wrong. Generic functions need usage to infer; `fn<T>()` cannot infer without a value or annotation. Nested generics often fail; use intermediate types.

## Discriminated unions

- Add a literal `type` or `kind` per variant. Exhaustive check: `default: const _never: never = x`. Do not mix with optional properties.

## `satisfies` vs type annotation

- `const x: Type = val` widens and can lose literal info. `const x = val satisfies Type` keeps literals and checks compatibility; prefer for config.

## Strict null

- `?.` yields `undefined`, not `null`. `??` only replaces null/undefined; `||` catches all falsy. Use `!` only as last resort.

## Module boundaries

- `import type` for type-only; `export type { X }` for re-exports. `.d.ts`: `declare module` needs exact path (`"lodash"` ≠ `"lodash/index"`). Augmentation without imports is global; add `export {}` for module. `declare const` with no value is global; `declare function` in module is not global (use `declare global {}`). No import/export = global script. `interface` merges from other files; `type` does not. `paths` need `baseUrl`; tsconfig paths are compile-only, bundler needs its own. Prefer named exports in `.d.ts`. `declare module "*.svg"` applies to all .svg.

## Generics

- `useState<User>()` infers `User | undefined`. `Promise.all([a(), b()])` needs `as const` for tuple. `<T = any>` leaks any; avoid. `<T extends object>` allows arrays; use `Record<string, unknown>` for objects. `keyof T` in generic is `string | number | symbol`. Arrays covariant (push can break at runtime); function params contravariant. `{ [K in keyof T]: X }` can lose modifiers; use `-?` or `-readonly`.

## Utility types

- `Partial<T>` and `Required<T>` shallow; `Required` does not remove `undefined` from union. `Omit`/`Pick` do not validate keys. `Record<string, T>` implies every key exists. `Extract<T, U>` is `never` when no match. `ReturnType`/`Parameters` with overloads use last signature. `NonNullable<T>` removes both null and undefined. `Awaited<T>` unwraps recursively.

## Migration

- `noImplicitAny: false` hides errors. Callback params without type are silently `any`. `strictNullChecks`/`strictPropertyInitialization` break many patterns; init or `!`. `as Type` does not validate; `as unknown as Type` is full escape. `JSON.parse` returns `any`; assert or validate. `@types/x` can be out of date; `skipLibCheck: true` hides .d.ts errors. `import x from "cjs"` vs `import * as x` differ. Use `@ts-expect-error` not `@ts-ignore`. `outDir` does not remove old files.

## Reference

[document-voice](../document-voice/SKILL.md).
