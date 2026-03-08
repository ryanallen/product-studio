---
name: developer-typescript
description: Type-safe TypeScript in plain language: narrowing, inference, generics, strict mode, utility types, declarations, migration.
triggers: "ts, typescript"
---

# Developer TypeScript

Use when the user needs TypeScript help: typing, narrowing, generics, strict mode, declaration files, or moving from JavaScript. Explain in simple words; the first time you use a term, briefly say what it means.

## Stop using `any`

Use `unknown` when you don't know the type, then narrow (e.g. check the shape) before using it. `any` turns off type checking. Type API results or use `unknown`; don't use `any`. Start with `unknown` so you don't get stuck with `any` later.

## Narrowing

Narrowing means TypeScript learns a more specific type after a check.

- `filter(Boolean)` does not narrow. Use a type guard: `.filter((x): x is T => Boolean(x))`.
- `Object.keys(obj)` is typed as `string[]`, not "the actual keys of obj," because objects can have extra keys at runtime.
- `Array.isArray()` narrows to an array but the element type may be `any`; you may need an assertion.
- The `in` check narrows only when the property appears in exactly one branch of the union.

## Literal types

- `let x = "hello"` has type `string`. For the literal type `"hello"`, use `const` or `as const`.
- Object properties widen: `{ status: "ok" }` gets `status: string`. Use `as const` or a type annotation to keep the literal.
- For a generic like `<T extends string>` with a literal, TypeScript may infer `string`, not the literal.

## Inference

TypeScript infers types when it can. It often loses inference in callbacks (e.g. some array methods); add a parameter type when it's wrong. A generic function like `fn<T>()` can't infer `T` without a value or an explicit type. Nested generics often fail to infer; use an intermediate type.

## Discriminated unions

Use a literal field (e.g. `type` or `kind`) on each variant so TypeScript can tell them apart. To make sure you handle every case, use `default: const _never: never = x` so a missing case causes a compile error. Don't mix optional properties into the same union or narrowing breaks.

## `satisfies` vs type annotation

- `const x: Type = val` makes `x` have type `Type` and can drop literal details.
- `const x = val satisfies Type` keeps the literal type and checks that it fits `Type`. Prefer this for config objects.

## Strict null

- Optional chaining `?.` gives `undefined` when something is missing, not `null`. That can matter for APIs that use `null`.
- `??` only replaces `null` and `undefined`; `||` replaces any falsy value (including `0` and `""`).
- Use the non-null assertion `!` only as a last resort; prefer narrowing or an early return.

## Module boundaries

- Use `import type` for types only; they are removed at build time.
- Re-export types with `export type { X }` so you don't pull in runtime code.
- In `.d.ts`, `declare module "x"` must use the exact string the rest of the code imports (e.g. `"lodash"` is not `"lodash/index"`). Augmentation without any import/export is global; add `export {}` to make the file a module. `declare const` with no value is global; `declare function` inside a module is not global (use `declare global { }` for globals). A `.d.ts` with no import/export is a global script. `interface` can be merged from other files; `type` cannot. In tsconfig, `paths` need `baseUrl`; path mapping is for the compiler only, so the bundler may need its own config. Prefer named exports in `.d.ts`. `declare module "*.svg"` applies to every .svg file.

## Generics

- `useState<User>()` gives you `User | undefined` until you set a value; handle the undefined case.
- `Promise.all([a(), b()])` keeps a tuple type only if you use `as const`.
- `<T = any>` leaks `any`; avoid it.
- `<T extends object>` allows arrays; for "real" objects use `Record<string, unknown>`.
- In a generic function, `keyof T` is `string | number | symbol`. Arrays are covariant (you can assign a more specific array to a less specific one) but that can allow invalid pushes at runtime; function parameters are contravariant. In a mapped type `{ [K in keyof T]: X }` you can lose optional or readonly; use `-?` or `-readonly` when you need to change that.

## Utility types

- `Partial<T>` and `Required<T>` only affect the top level; nested objects stay as-is. `Required<T>` does not remove `undefined` from a union.
- `Omit<T, K>` and `Pick<T, K>` do not check that the keys exist; a typo still compiles.
- `Record<string, T>` means "every string key has a value of type T"; missing keys still type as T, not `T | undefined`.
- `Extract<T, U>` is `never` when nothing in T matches U. `ReturnType` and `Parameters` with overloaded functions use only the last signature. `NonNullable<T>` removes both `null` and `undefined`. `Awaited<T>` unwraps promises, including nested ones.

## Migration from JavaScript

- Turning off `noImplicitAny` hides real type errors. Callback parameters with no type become `any` silently. Enabling `strictNullChecks` or `strictPropertyInitialization` breaks a lot of code; add inits or use `!` where appropriate.
- `as Type` does not check at runtime; `as unknown as Type` bypasses the type system; avoid both when you can. `JSON.parse` returns `any`; add a type assertion or validate the value. `@types/` packages can be out of date. `skipLibCheck: true` hides errors in `.d.ts` files too. `import x from "cjs"` and `import * as x from "cjs"` behave differently. Prefer `@ts-expect-error` over `@ts-ignore` so the comment fails when the error is fixed. `outDir` does not delete old files; leftover .js can cause confusion.

## Reference

[document-voice](../document-voice/SKILL.md) – use when explaining to the user.
