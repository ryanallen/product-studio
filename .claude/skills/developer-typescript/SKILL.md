---
name: developer-typescript
description: TypeScript: narrowing, inference, generics, strict mode, utility types, declarations, migration. Plain language. Use when user says ts, typescript, /developer-typescript.
---

# Developer TypeScript

Use when the user needs TypeScript help: typing, narrowing, generics, strict mode, declaration files, or moving from JavaScript. Plain language; explain terms the first time. [document-voice](../document-voice/SKILL.md).

## Inputs

- **Context** – TypeScript or JS migration; types, generics, strict mode, or declaration files. Optional: project path.
- **Source** – User question or file; apply the rules below.

## Output

Guidance applied (types, patterns, fixes). No new repo unless requested.

## Process

### 1. Stop using `any`

Use `unknown` when the type is unknown; narrow (e.g. check the shape) before use. `any` turns off checking. Type API results or use `unknown`; start with `unknown` so you do not get stuck with `any`.

### 2. Narrowing

TypeScript narrows to a more specific type after a check.

- `filter(Boolean)` does not narrow; use a type guard: `.filter((x): x is T => Boolean(x))`.
- `Object.keys(obj)` is `string[]`, not the key union; objects can have extra keys at runtime.
- `Array.isArray()` narrows to array but element type may be `any`; add assertion if needed.
- `in` narrows only when the property appears in exactly one branch of the union.

### 3. Literal types

- `let x = "hello"` has type `string`; use `const` or `as const` for literal `"hello"`.
- Object properties widen: `{ status: "ok" }` gives `status: string`; use `as const` or a type to keep the literal.
- Generic `<T extends string>` with a literal may infer `string`; use `as const` or explicit type if needed.

### 4. Inference

TypeScript infers when it can. Inference is often lost in callbacks (e.g. array methods); add a parameter type when wrong. Generic `fn<T>()` cannot infer `T` without a value or explicit type. Nested generics often fail; use an intermediate type.

### 5. Discriminated unions

Use a literal field (`type` or `kind`) on each variant so TypeScript can discriminate. Exhaustiveness: `default: const _never: never = x` so a missing case errors. Do not mix optional properties into the same union or narrowing breaks.

### 6. `satisfies` vs type annotation

- `const x: Type = val` gives `x` type `Type` and can drop literal details.
- `const x = val satisfies Type` keeps the literal and checks it fits `Type`. Prefer for config objects.

### 7. Strict null

- `?.` gives `undefined` when missing, not `null`; matters for APIs that use `null`.
- `??` replaces only `null` and `undefined`; `||` replaces any falsy (including `0` and `""`).
- Use `!` only as a last resort; prefer narrowing or early return.

### 8. Module boundaries

- `import type` for types only; removed at build time.
- Re-export with `export type { X }` so you do not pull in runtime code.
- `.d.ts`: `declare module "x"` must match the import string exactly. No import/export = global script; add `export {}` for a module. `declare global { }` for globals inside a module. `interface` merges from other files; `type` does not. `paths` in tsconfig need `baseUrl`; path mapping is compiler-only; bundler may need its own config. Prefer named exports in `.d.ts`.

### 9. Generics

- `useState<User>()` is `User | undefined` until set; handle undefined.
- `Promise.all([a(), b()])` keeps tuple type only with `as const`.
- `<T = any>` leaks `any`; avoid. `<T extends object>` allows arrays; use `Record<string, unknown>` for object-only.
- `keyof T` is `string | number | symbol`. Arrays are covariant (invalid push can type-check); function params are contravariant. Mapped type `{ [K in keyof T]: X }` can lose optional or readonly; use `-?` or `-readonly` to change.

### 10. Utility types

- `Partial<T>` and `Required<T>` only affect top level; nested unchanged. `Required<T>` does not remove `undefined` from a union.
- `Omit<T, K>` and `Pick<T, K>` do not check keys exist; typos still compile.
- `Record<string, T>`: missing keys still type as T, not `T | undefined`.
- `Extract<T, U>` is `never` when nothing matches. `ReturnType`/`Parameters` with overloads use only the last signature. `NonNullable<T>` removes `null` and `undefined`. `Awaited<T>` unwraps promises (nested too).

### 11. Migration from JavaScript

- Turning off `noImplicitAny` hides errors; untyped callbacks become `any`. `strictNullChecks` or `strictPropertyInitialization` break code; add inits or `!` where needed.
- `as Type` is not runtime check; `as unknown as Type` bypasses the type system; avoid when you can. `JSON.parse` returns `any`; assert or validate. `@types/` can be out of date. `skipLibCheck: true` hides `.d.ts` errors. Prefer `@ts-expect-error` over `@ts-ignore` so it fails when the error is fixed. `outDir` does not delete old files; leftover .js can confuse.

## Reference

[document-voice](../document-voice/SKILL.md). [developer-electron](../developer-electron/SKILL.md) for Electron/desktop apps.
