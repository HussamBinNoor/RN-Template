# RN-Template

A production-grade **React Native 0.87.1** starter template, authored by [Hussam Bin Noor](https://github.com/HussamBinNoor). Strict TypeScript, the New Architecture (Fabric + TurboModules) on by default, theming, navigation, forms, data layer, 20+ reusable UI components, working demo screens, and a **branded splash + AppIcon** generated from a single source asset.

The repo is laid out as a [React Native CLI template package](https://github.com/react-native-community/cli/blob/main/docs/init.md#creating-custom-template) so it can be used directly with `npx @react-native-community/cli init … --template .` and consumed end-to-end by the bundled `create-rn87-app` scaffolder.

## 🚀 Quick start — Use this template

There are **four ways** to scaffold a new React Native app from this template. Pick whichever fits your workflow.

> ⚠️ **Project names** must be **alphanumeric PascalCase** — no hyphens, spaces, or symbols. Use `MyApp` or `AiPolice`, **not** `My-App`.
>
> ⚠️ **Do not wrap paths or URLs in `<…>`.** Those angle brackets are documentation placeholders only. Pasting them into zsh causes `parse error near '\n'`. Copy the commands below as-is.

### 1. From a local clone (best while developing the template)

From the parent folder of this repo (adjust the path if yours differs):

```bash
npx @react-native-community/cli@latest init MyApp \
  --template /Users/mac/Documents/Free-Project/HBN-RN-Template
cd MyApp
yarn ios    # or: yarn android
```

Or from inside the template repo, using a relative path:

```bash
cd /Users/mac/Documents/Free-Project/HBN-RN-Template
npx @react-native-community/cli@latest init MyApp --template .
# project is created next to where you ran the command — move into it:
cd ../MyApp   # or wherever the CLI printed the path
yarn ios
```

### 2. From GitHub

Uses whatever is currently on the default branch of the remote (local unpushed fixes will not appear):

```bash
npx @react-native-community/cli@latest init AiPolice \
  --template https://github.com/HussamBinNoor/RN-Template.git
cd AiPolice
yarn ios    # or: yarn android
```

The CLI copies `template/`, then renames `HbnRnTemplate` → your project name everywhere it can (iOS target, Android package `com.hbnrntemplate` → `com.aipolice`, `app.json`, native entry, etc.).

### 3. Bundled `create-rn87-app` CLI (from this repo)

Handles install (+ CocoaPods on macOS) after scaffold:

```bash
cd /Users/mac/Documents/Free-Project/HBN-RN-Template
node cli/bin/create-rn87-app.js MyApp --template .
cd MyApp
yarn ios
```

Useful flags: `--pm npm`, `--skip-install`, `--verbose`, `--dry-run`.

### 4. From npm (after you publish)

```bash
npx @react-native-community/cli@latest init MyApp --template hbn-rn-template
cd MyApp && yarn ios
```

Or the published scaffolder:

```bash
npx create-rn87-app MyApp
cd MyApp && yarn ios
```

Packages: [`hbn-rn-template`](https://www.npmjs.com/package/hbn-rn-template) and [`create-rn87-app`](https://www.npmjs.com/package/create-rn87-app).

### Or click **Use this template** on GitHub

That forks the whole template repo as a standalone project. Prefer the `init --template` flows above when you want a normal app scaffold, not a fork of the template packaging.

### Requirements

- **Node** `>= 22.13` (template `engines`; root package accepts `>= 20.12` for tooling)
- **yarn** 1.x classic
- **iOS** — macOS with Xcode 15+ and CocoaPods 1.13+
- **Android** — Android Studio with API 24+ SDK and JDK 17

## Why this template

- **RN 0.87.1** with the New Architecture always on.
- **React 19.2** with concurrent features.
- **Strict TypeScript** — `strict: true`, `noUncheckedIndexedAccess`, `customConditions: ["react-native"]`.
- **Real-world defaults** — `lucide-react-native` for icons (no `react-native-vector-icons` to wire), `dayjs` for dates, `react-native-mmkv` v4 for storage, `axios` + `@tanstack/react-query` for data.
- **A working app** — Home, Components, Form (RHF + Zod), Details, Settings. Theming switcher (light / dark / system) that actually persists.
- **Branding built in** — AppIcon (iOS 15 sizes + Android 5 densities), native splash on iOS + Android, plus a JS splash overlay that bridges the gap until the first paint. All generated from `template/assets/logo.png` via `scripts/build-logo.py`.
- **Quality gates** — `yarn lint` runs ESLint + Prettier + `tsc`; `yarn test` runs Jest with `@testing-library/react-native`.
- **Ships as a real RN CLI template** — `template.config.js` + `template/` subdir means `npx … init --template .` Just Works.

## Tech stack

| Concern         | Library / version                                  |
| --------------- | -------------------------------------------------- |
| React Native    | 0.87.1                                             |
| React           | 19.2.x                                             |
| TypeScript      | 5.x (strict)                                       |
| Navigation      | `@react-navigation/native` 7.x                     |
| Bottom Tabs     | `@react-navigation/bottom-tabs` 7.x                |
| Bottom Sheet    | `@gorhom/bottom-sheet` 5.x                         |
| Gestures        | `react-native-gesture-handler` 3.x                 |
| Reanimated      | `react-native-reanimated` 4.7                      |
| Worklets        | `react-native-worklets` 0.13                       |
| Storage         | `react-native-mmkv` 4.3                            |
| Form            | `react-hook-form` 7.90 + `zod` 4 + RHF resolvers 6 |
| Data fetching   | `@tanstack/react-query` 5.x + `axios` 1.x          |
| State           | `zustand` 5.x                                      |
| Icons           | `lucide-react-native` 1.59                         |
| Dates           | `dayjs` 1.11                                       |
| Package manager | yarn 1.x (classic)                                 |

## Repo layout

This repository **is** the template. The React Native app lives under `template/`, which is what the RN CLI copies when you scaffold a new project.

```
HBN-RN-Template/
├── template.config.js       # placeholderName: HbnRnTemplate, templateDir: template
├── package.json             # npm package: hbn-rn-template
├── .gitignore
├── cli/                     # create-rn87-app scaffolder (publish separately)
│   ├── bin/create-rn87-app.js
│   ├── package.json         # npm package: create-rn87-app
│   └── src/
├── scripts/
│   ├── build-logo.py        # regenerates iOS + Android icon/splash from logo.png
│   └── traction.js
├── assets/logo.png          # optional root copy of the brand mark
└── template/                # ← the actual RN 0.87 app (copied by init)
    ├── package.json
    ├── yarn.lock
    ├── App.tsx
    ├── assets/logo.png      # master art for logo:build
    ├── android/             # com.hbnrntemplate; SplashTheme, splash_screen.xml
    ├── ios/                 # HbnRnTemplate.xcworkspace + AppIcon / LaunchScreen
    ├── __tests__/
    └── src/
        ├── components/      # common, feedback, forms, layout, pickers, bottom-sheet, Splash
        ├── config/
        ├── constants/
        ├── hooks/
        ├── navigation/
        ├── providers/
        ├── screens/         # Home, Components, FormExample, Details, Settings
        ├── services/
        ├── storage/
        ├── store/
        ├── theme/
        ├── types/
        └── utils/
```

> **`templateDir: 'template'` is non-negotiable.** The RN CLI's `copyTemplate` does
> `path.resolve(templateSourceDir, 'node_modules', <name>, templateConfig.templateDir)`.
> If `templateDir` is missing, that `path.resolve` call blows up with
> `"The 'paths[3]' argument must be of type string. Received undefined."` —
> which is exactly the error you get if you copy the source layout without
> adding this field. Keep it.

## Working on the template itself

```sh
# from repo root
yarn template:install     # cd template && yarn install
yarn template:test        # cd template && yarn test
yarn template:lint        # cd template && yarn lint
yarn template:typecheck   # cd template && yarn typecheck
yarn cli:test             # node --test cli/src/__tests__
```

Or, equivalently, drop into `template/` and use the regular RN commands:

```sh
cd template
yarn              # install deps
yarn pod-install  # iOS only
yarn start        # in one terminal
yarn ios          # in another, or: yarn android
```

## Scaffolding a new app

Same underlying engine in both cases: `@react-native-community/cli init --template …`.

### Option A — bundled CLI

Thin wrapper around the RN CLI; then runs install (and CocoaPods on macOS).

```bash
# from the template repo root — always pass an absolute or resolvable --template while developing:
node cli/bin/create-rn87-app.js MyApp --template "$(pwd)"

# optional parent directory as second positional (project lands at PARENT/MyApp):
node cli/bin/create-rn87-app.js MyApp /tmp/apps --template "$(pwd)"

# different package manager:
node cli/bin/create-rn87-app.js MyApp --template "$(pwd)" --pm npm
```

| Flag | Description |
| --- | --- |
| first arg (name) | PascalCase project name (required) |
| second arg (target) | Optional parent directory. Default: create `./Name` under the current working directory |
| `--pm` / `--package-manager` | `yarn` (default), `npm`, or `pnpm` |
| `--template` | Local path, `file://…`, GitHub URL, or npm package name |
| `--skip-install` | Skip dependency install |
| `--verbose` | Stream subprocess output |
| `--dry-run` | Print the plan only |
| `-h` / `--help`, `-v` / `--version` | Help / version |

`HBN_RN_TEMPLATE` overrides the default template when you omit `--template` (default npm name: `hbn-rn-template`).

### Option B — raw RN CLI

```bash
npx @react-native-community/cli@latest init MyApp \
  --template /Users/mac/Documents/Free-Project/HBN-RN-Template \
  --pm yarn
```

After publish, you can use `--template hbn-rn-template` instead of a path.
## Verifying a scaffold

After scaffolding, the new project should:

- Build with `yarn ios` and `yarn android` (after `bundle exec pod install`).
- Have all `HbnRnTemplate` strings replaced — `ios/MyApp.xcworkspace`, `ios/MyApp.xcodeproj`, `android/app/src/main/java/com/myapp/`, `app.json`, scheme files, etc.
- Show the HBN monogram on the splash screen and use it as the AppIcon on both platforms.
- Pass `yarn typecheck` and `yarn test` (the template's CI gate).

## Branding: AppIcon + splash

This template ships with a complete branded launch experience out of the box. Everything is generated from a single source image — drop your replacement into `template/assets/logo.png` and re-run the build script.

### What's wired

| Surface                       | Where                                                                                         | Notes                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| iOS AppIcon (15 sizes)        | `template/ios/HbnRnTemplate/Images.xcassets/AppIcon.appiconset/`                              | 20/29/40/60/76/83.5/1024 px + @2x/@3x                                                            |
| iOS native splash             | `template/ios/HbnRnTemplate/LaunchScreen.storyboard`                                          | Centered logo on the brand gray (`#E8EBF0`)                                                      |
| Android AppIcon (5 densities) | `template/android/app/src/main/res/mipmap-{m,h,xh,xxh,xxxh}dpi/`                              | `ic_launcher.png` + `ic_launcher_round.png` (circular mask)                                      |
| Android native splash         | `template/android/app/src/main/res/drawable/splash_screen.xml`                                | `<layer-list>` over `@color/splash_background`                                                   |
| Android activity theme        | `template/android/app/src/main/res/values/styles.xml` (`SplashTheme`) + `AndroidManifest.xml` | `SplashTheme` until first JS frame, then `setTheme(R.style.AppTheme)` in `MainActivity.onCreate` |
| JS splash overlay             | `template/src/components/Splash/Splash.tsx`                                                   | Reanimated fade-out, `minDurationMs` prop, `onFinished` callback                                 |

### Regenerating from your own art

The full swap, end to end:

```sh
# ─────────────────────────────────────────────────────────────────────────
# 0. (Optional) Start clean so you can see exactly what changes
# ─────────────────────────────────────────────────────────────────────────
# Only do this if you want to diff the regenerated set against git.
# Skip it if you're happy overwriting the existing assets in place.
git status
git add -A && git commit -m "chore: snapshot before logo swap"   # or skip

# ─────────────────────────────────────────────────────────────────────────
# 1. Drop the new art
# ─────────────────────────────────────────────────────────────────────────
# Replace the master. Square, PNG, ≥ 1024×1024, no transparency required
# (the rounded-corner background is drawn by the script, so a flat PNG
# works best). The existing `template/assets/logo.png` is committed to
# git so this is a real swap, not a build artifact.
cp /path/to/your-logo.png template/assets/logo.png
# Verify it landed:
ls -la template/assets/logo.png
file template/assets/logo.png            # should say PNG image, ≥ 1024×1024

# ─────────────────────────────────────────────────────────────────────────
# 2. Regenerate every derived asset
# ─────────────────────────────────────────────────────────────────────────
# From the repo root — both forms do the same thing:
yarn logo:build
# or, equivalently:
python3 scripts/build-logo.py

# The script overwrites (it does not preserve old sizes):
#   - 15 iOS AppIcon PNGs
#   - 3 iOS splash mark PNGs
#   - 5 × 2 Android mipmap PNGs (regular + round)
#   - 1 Android splash drawable PNG
# and writes a fresh `template/assets/logo.png` master (only if it
# was missing — if you supplied your own, the script keeps yours).

# ─────────────────────────────────────────────────────────────────────────
# 3. Sanity-check what got written
# ─────────────────────────────────────────────────────────────────────────
# iOS AppIcon — all 15 sizes:
ls template/ios/HbnRnTemplate/Images.xcassets/AppIcon.appiconset/ | grep -c '\.png$'
# expected: 15

# iOS splash:
ls template/ios/HbnRnTemplate/Images.xcassets/SplashImage.imageset/
# expected: Contents.json  splash-logo.png  splash-logo@2x.png  splash-logo@3x.png

# Android mipmaps — one launcher + one round per density:
for d in mipmap-mdpi mipmap-hdpi mipmap-xhdpi mipmap-xxhdpi mipmap-xxxhdpi; do
  echo "$d:"; ls template/android/app/src/main/res/$d
done

# Android splash drawable:
ls template/android/app/src/main/res/drawable/splash_logo.png \
      template/android/app/src/main/res/drawable/splash_screen.xml
# both must exist

# Open the master in Preview/Quick Look to eyeball the result:
qlmanage -p template/assets/logo.png &>/dev/null &
open template/assets/logo.png

# ─────────────────────────────────────────────────────────────────────────
# 4. Re-run the template's quality gates (logo swap shouldn't break them)
# ─────────────────────────────────────────────────────────────────────────
yarn template:typecheck
yarn template:test
yarn template:lint

# ─────────────────────────────────────────────────────────────────────────
# 5. Scaffold a throwaway app to prove the new art ships end-to-end
# ─────────────────────────────────────────────────────────────────────────
rm -rf /tmp/logo-verify
node cli/bin/create-rn87-app.js VerifyLogo /tmp/logo-verify \
  --template "$(pwd)" --pm yarn --skip-install

# Confirm the assets travelled through the rename
# (project path is /tmp/logo-verify/VerifyLogo with the current CLI):
APP=/tmp/logo-verify/VerifyLogo
ls "$APP/ios/VerifyLogo/Images.xcassets/AppIcon.appiconset/" | head -3
ls "$APP/android/app/src/main/res/mipmap-xxxhdpi/"
# Prefer zero leftover placeholder names in native identifiers:
grep -rln "HbnRnTemplate" "$APP" 2>/dev/null || true

rm -rf /tmp/logo-verify

# ─────────────────────────────────────────────────────────────────────────
# 6. Commit
# ─────────────────────────────────────────────────────────────────────────
git add -A
git status
git diff --cached --stat
git commit -m "chore(branding): update AppIcon and splash to new logo"
```

> The `build-logo.py` script can also **draw** a clean placeholder HBN monogram from scratch if `template/assets/logo.png` is missing. Useful for CI and fresh clones.
>
> **Heads up on iOS caches.** Xcode caches asset catalog outputs in `~/Library/Developer/Xcode/DerivedData/`. If a fresh `yarn ios` still shows the old icon, run `xcodebuild clean` (or **Product → Clean Build Folder** in Xcode) before rebuilding. The same applies to `android/app/build/` on Android — `yarn template:clean` (or `cd android && ./gradlew clean`) takes care of it.

## Customizations baked in

- `package.json` carries `author: { name: "Hussam Bin Noor", url: "https://github.com/HussamBinNoor" }` and a `repository` block pointing at the source. These survive the scaffold rename pass because the RN CLI's `replacePlaceholderWithPackageName` only touches the `placeholderName` string (`HbnRnTemplate`).
- `src/constants/index.ts` exports `AUTHOR_NAME` and `AUTHOR_GITHUB_URL` for in-app use.
- `src/screens/Settings/Settings.tsx` → **About** card shows a `By Hussam Bin Noor` row that opens the GitHub profile (uses the `AtSign` icon from `AppIcon`).

## Theming (inside the template)

- `useAppTheme()` returns `Theme & { preference, resolvedMode, setPreference }`.
- The theme is **flat** — every consumer can read `theme.colors.primary`, `theme.spacing.md`, `theme.radii.lg` without indirection.
- Preference persists via `react-native-mmkv` under the `@hbn/theme-mode` key.
- Light / dark / system switching happens instantly. See `src/components/bottom-sheet/ThemeBottomSheet` for the reference implementation.

## Forms (inside the template)

The template ships with `react-hook-form` + `zod` 4. Example:

```tsx
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type FormValues = z.infer<typeof schema>;

const { control, handleSubmit } = useForm<FormValues>({
  resolver: zodResolver(schema),
});

<FormInput control={control} name="email" label="Email" required />;
```

See `src/screens/FormExample/FormExample.tsx` for a full working form.

## Data layer (inside the template)

`src/services/api/client.ts` is an Axios instance with:

- Base URL from `env.apiBaseUrl`
- Request/response interceptors
- `ApiError` class with `status`, `code`, `message`, and `details`
- `apiGet / apiPost / apiPut / apiDelete` wrappers

Pair it with TanStack Query:

```tsx
const { data, isLoading } = useQuery({
  queryKey: queryKeys.todos,
  queryFn: () => apiGet<Todo[]>("/todos"),
});
```

## State (inside the template)

Zustand v5 (no `immer` bundled by default — use `set`):

```tsx
import { useAppStore } from "@/store/useAppStore";
const pref = useAppStore((s) => s.themePreference);
useAppStore.getState().setThemePreference("dark");
```

## Testing (inside the template)

- Jest 29 with the `@react-native/jest-preset` preset and `@testing-library/react-native`.
- Custom mocks for `react-native-mmkv` (in-memory shim), `react-native-reanimated` (stub), and `react-native-safe-area-context` (zero insets).
- Run all tests: `yarn test`.
- Run a single file: `yarn test __tests__/utils/strings.test.ts`.
- Watch mode: `yarn test --watch`.

## Known limitations

- The CLI defaults to the npm package `hbn-rn-template`. When scaffolding from a local clone, pass `--template /absolute/path/to/this/repo` (or set `HBN_RN_TEMPLATE`).
- GitHub `--template https://github.com/HussamBinNoor/RN-Template.git` only sees **pushed** commits.
- `customConditions: ["react-native"]` needs `moduleResolution: "bundler"` — already set in `template/tsconfig.json`.
- Do **not** commit `template/node_modules/`, `template/ios/Pods/`, or Android/iOS build dirs into the template package — they break RN CLI copy. `template/yarn.lock` **is** kept so scaffolds get reproducible installs.

## Publishing (you run these)

Preflight from the repo root:

```bash
yarn cli:test
yarn template:typecheck
yarn template:test --watchAll=false --no-watchman
yarn template:lint

# dry-scaffold without install
rm -rf /tmp/hbn-scaffold-check
npx @react-native-community/cli@latest init ScaffoldCheck \
  --template "$(pwd)" \
  --directory /tmp/hbn-scaffold-check \
  --skip-install
```

Publish the template package (root), then the scaffolder (`cli/`):

```bash
# 1) template
npm pack --dry-run    # confirm no node_modules / Pods / caches in the tarball
npm publish --access public

# 2) scaffolder
cd cli
npm pack --dry-run
npm publish --access public
```

Then verify:

```bash
npx @react-native-community/cli@latest init PubCheck --template hbn-rn-template
npx create-rn87-app PubCheck2
```
## Troubleshooting / Fix

A field guide for the things that bit me while building this and will probably bite you too. Each section gives the symptom, the cause, and the fix in command form.

### Scaffold fails with `"The 'paths[3]' argument must be of type string. Received undefined."`

**Cause.** The RN CLI's `copyTemplate` does
`path.resolve(templateSourceDir, 'node_modules', <name>, templateConfig.templateDir)`.
If `templateDir` is missing from your `template.config.js`, the 4th arg is `undefined` and the `path.resolve` call explodes.

**Fix.**

```sh
# 1. Verify the field is set:
grep templateDir template.config.js
#    expected:   templateDir: 'template',

# 2. If it's missing, add it and retry:
#    (edit template.config.js, add: `templateDir: 'template',`)
node cli/bin/create-rn87-app.js MyApp /tmp/my-app --template "$(pwd)" --skip-install
```

### Scaffold fails with `"Received malformed response from registry for '.'"`

**Cause.** The CLI treated `--template .` as an npm package name instead of a local path.

**Fix.**

```bash
# Always pass an absolute path while developing locally:
node cli/bin/create-rn87-app.js MyApp /tmp/my-app \
  --template "$(pwd)" --verbose
# The "template:" line should print the absolute path, not ".".
```

### zsh: `parse error near '\n'` when pasting a command

**Cause.** The command included documentation angle brackets such as `--template <https://…>` or `--template <this-repo-path>`. zsh treats `<…>` as redirection.

**Fix.** Paste the real path or URL with no angle brackets (see Quick start).

### Scaffold fails with `"Target directory already exists and is not empty"`

**Cause.** A previous scaffold run left files behind (a partial install, a leftover `MyApp` dir, etc.).

**Fix.**

```bash
rm -rf /tmp/my-app/MyApp          # only if you're sure
# or pick a fresh parent:
node cli/bin/create-rn87-app.js MyApp /tmp/my-app-fresh --template "$(pwd)"
```

### App icon doesn't update after I swap `template/assets/logo.png`

**Cause.** iOS caches asset catalogs in `~/Library/Developer/Xcode/DerivedData/`, and Android caches them under `android/app/build/`. The new PNGs are on disk; the build just doesn't see them.

**Fix.**

```sh
# 1. Regenerate from the new master (idempotent — safe to re-run):
yarn logo:build

# 2. iOS — clear derived data, then rebuild:
rm -rf ~/Library/Developer/Xcode/DerivedData
cd ios && xcodebuild clean && cd ..
yarn ios

# 3. Android — clear gradle's build cache, then rebuild:
yarn template:clean       # = cd template && yarn clean (android/gradlew clean)
# or, inside the scaffolded app:
cd android && ./gradlew clean && cd ..
yarn android
```

### White flash on Android between cold start and the splash

**Cause.** `MainActivity.onCreate` isn't re-theming back to `AppTheme` before `super.onCreate`, so the `SplashTheme` stays on top while React is booting.

**Fix.**

```sh
# Inspect the activity — it must look like this:
cat android/app/src/main/java/com/<your-package>/MainActivity.kt
# expected (excerpt):
#   override fun onCreate(savedInstanceState: Bundle?) {
#     setTheme(R.style.AppTheme)   # <-- this line is the fix
#     super.onCreate(savedInstanceState)
#   }
# If the setTheme line is missing, add it (see MainActivity.kt in template/).
```

### White flash on iOS between cold start and the splash

**Cause.** The `LaunchScreen.storyboard` doesn't reference an image — the user sees a white `UIView` until JS paints.

**Fix.**

```sh
# 1. Confirm the storyboard references splash-logo:
grep 'image="' ios/<YourApp>/LaunchScreen.storyboard
# expected: ... image="splash-logo" ...

# 2. Confirm the imageset exists with a real PNG:
ls ios/<YourApp>/Images.xcassets/SplashImage.imageset/
# expected: Contents.json  splash-logo.png  splash-logo@2x.png  splash-logo@3x.png

# 3. If the imageset is empty, regenerate:
yarn logo:build
# And clean Xcode derived data:
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### `<Splash />` doesn't show in the running app, or shows forever

**Cause.** Usually a reanimated/worklets setup issue, or `minDurationMs` is too high and the fade never starts.

**Fix.**

```sh
# 1. Sanity-check the component is mounted:
grep '<Splash' App.tsx
# expected: <Splash /> inside <AppProviders>

# 2. Check the babel plugin order — `react-native-worklets/plugin` must be LAST:
cat babel.config.js
# expected (excerpt):
#   plugins: [
#     ...
#     'react-native-worklets/plugin',   # <-- last
#   ]

# 3. If the splash never fades, drop the min duration to test:
#    Edit App.tsx: <Splash minDurationMs={0} />
#    If that still doesn't fade, reanimated isn't wired up — re-check
#    babel.config.js and `yarn install`.

# 4. Reset Metro's cache and retry:
yarn start --reset-cache
```

### Tests fail with "Animated: `useNativeDriver` is not supported" / Reanimated warnings

**Cause.** The Jest mocks for `react-native-reanimated` and `react-native-worklets` are in `jest.setup.ts`. If they get out of sync with the real packages, tests leak async work and the worker-pool "force exit" warning fires.

**Fix.**

```sh
# 1. Make sure the mocks are loaded:
grep -E "react-native-reanimated|react-native-worklets" jest.setup.ts
# Both `jest.mock(...)` blocks should be present.

# 2. Re-run a single suite for a clean signal:
yarn test __tests__/components/Splash.test.tsx

# 3. If the worker still won't exit, run with leak detection:
yarn test --detectOpenHandles
```

### `paths[3] undefined` again, after a successful scaffold

**Cause.** `template/ios/Pods/`, `template/ios/build/`, `template/android/build/`, or `template/node_modules/` snuck back in. These break the RN CLI's `walk` because it tries to read symlinks / huge trees that don't exist in the target project.

**Fix.**

```sh
# Strip build artifacts out of the template — they're regenerated on first install.
# Keep template/yarn.lock (reproducible scaffolds).
rm -rf template/ios/Pods template/ios/build
rm -rf template/android/build template/android/app/build
rm -rf template/node_modules template/vendor
rm -f template/.eslintcache
# Verify nothing's left:
find template -maxdepth 2 \( -name Pods -o -name build -o -name node_modules \) 2>/dev/null
# expected: (empty)
```

### `lucide-react-native` errors during `yarn install` or in tests

**Cause.** lucide ships ESM, and Jest's default RN transform trips over it. The template works around this in `jest.config.js`.

**Fix.**

```sh
# 1. Verify the moduleNameMapper is set:
grep -A1 "lucide-react-native" jest.config.js
# expected:
#   moduleNameMapper: {
#     '^lucide-react-native$':
#       '<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js',
#   }

# 2. If the CJS path doesn't exist (version bump moved it), point at the new path:
ls node_modules/lucide-react-native/dist/cjs/ 2>/dev/null
# Update jest.config.js to whatever the current CJS file is called.

# 3. Re-run tests:
yarn test
```

### `eslint . --cache` is suddenly noisy after a logo swap

**Cause.** `build-logo.py` doesn't run Prettier. Large binary diffs can also touch a lot of files and trip the cache.

**Fix.**

```sh
# 1. Run lint:fix to format + autofix:
yarn template:lint:fix

# 2. Or, to ignore generated PNGs from prettier entirely (recommended):
#    Add to template/.prettierignore (and root .prettierignore):
#      template/ios/HbnRnTemplate/Images.xcassets/**/*.png
#      template/ios/HbnRnTemplate/Images.xcassets/**/*.json
#      template/android/app/src/main/res/mipmap-*/*.png
#      template/android/app/src/main/res/drawable*/splash_logo.png
```

## 📊 Traction & analytics

Track who is finding and using this template with one command:

```bash
yarn traction
```

It prints every public signal we care about in one snapshot:

| Source | Metrics | Auth needed |
| --- | --- | --- |
| GitHub repo | stars, forks, watchers, open issues, age | no |
| GitHub traffic | unique visitors, page views, clones, top referrers & paths | yes — `GH_TOKEN` with push access |
| npm registry | latest version, publish date, unpacked size | no |
| npm downloads | weekly / monthly / yearly download totals | no |

Only the GitHub traffic section needs credentials, and it degrades gracefully — every other
section still works without them. To enable traffic data:

```bash
gh auth login
gh auth switch   # pick the account that owns HussamBinNoor/RN-Template
```

…or export `GH_TOKEN` to a PAT with `repo` scope.

## License

MIT — see [LICENSE](LICENSE).
