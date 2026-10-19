# HBN-RN-Template

A production-grade **React Native 0.87.1** starter template, authored by [Hussam Bin Noor](https://github.com/hussambinnoor). Strict TypeScript, the New Architecture (Fabric + TurboModules) on by default, theming, navigation, forms, data layer, 20+ reusable UI components, working demo screens, and a **branded splash + AppIcon** generated from a single source asset.

The repo is laid out as a [React Native CLI template package](https://github.com/react-native-community/cli/blob/main/docs/init.md#creating-custom-template) so it can be used directly with `npx @react-native-community/cli init … --template .` and consumed end-to-end by the bundled `create-rn87-app` scaffolder.

## 🚀 Quick start — Use this template

There are **three ways** to scaffold a new React Native app from this template. Pick whichever fits your workflow.

### 1. One-liner from GitHub ⭐ (recommended)

```bash
npx @react-native-community/cli@latest init MyApp \
  --template https://github.com/hussambinnoor/HBN-RN-Template
cd MyApp && yarn ios    # or `yarn android`
```

This downloads the repo, renames `HbnRnTemplate` → `MyApp` everywhere (package name, Android package `com.hbnrntemplate` → `com.myapp`, iOS target, native module `PhotoADay` → `MyApp`), runs `yarn install`, and you're ready to run.

### 2. Clone first, use locally

Best when you want to inspect or customise the template before scaffolding:

```bash
git clone https://github.com/hussambinnoor/HBN-RN-Template
npx @react-native-community/cli@latest init MyApp --template ./HBN-RN-Template
cd MyApp && yarn install && yarn ios
```

### 3. Use the bundled `create-rn87-app` CLI

Friendlier interactive scaffolder (prompts for target folder, package manager, etc.):

```bash
git clone https://github.com/hussambinnoor/HBN-RN-Template
node HBN-RN-Template/cli/bin/create-rn87-app.js MyApp
cd MyApp && yarn install && yarn ios
```

### Or click **Use this template** on GitHub

On the repo page, the green **Use this template** button forks the whole template repo as a brand-new standalone project. Use this if you want to maintain a custom fork; for scaffolding an RN app, use one of the three commands above.

### Requirements

- **Node** `>= 20.12`
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
HbnRnTemplate/
├── template.config.js       # placeholderName, templateDir, title, etc.
├── package.json             # CLI scripts (template:lint, template:test, cli:test, logo:build)
├── .gitignore
├── cli/                     # create-rn87-app scaffolder
│   ├── bin/create-rn87-app.js
│   └── src/
│       ├── index.js
│       ├── parse-args.js
│       ├── validate-name.js
│       ├── resolve-target.js
│       ├── run-init.js
│       ├── help.js
│       ├── version.js
│       └── log.js
├── scripts/
│   └── build-logo.py        # regenerates iOS + Android icon/splash from assets/logo.png
└── template/                # ← the actual RN 0.87 app
    ├── package.json
    ├── App.tsx
    ├── index.js
    ├── tsconfig.json
    ├── babel.config.js
    ├── metro.config.js
    ├── jest.config.js
    ├── jest.setup.ts
    ├── .eslintrc.js
    ├── .prettierrc.js
    ├── .gitignore
    ├── app.json
    ├── Gemfile
    ├── Gemfile.lock
    ├── __tests__/           # co-located jest tests
    ├── android/             # `com.hbnrntemplate` package; SplashTheme, splash_screen.xml
    ├── ios/                 # `HbnRnTemplate.xcworkspace`; LaunchScreen.storyboard, AppIcon.appiconset
    └── src/
        ├── components/      # 20+ atoms, feedback, forms, layout, pickers, bottom-sheet, Splash
        ├── config/          # env, feature flags
        ├── constants/       # APP_NAME, APP_VERSION, AUTHOR_NAME, AUTHOR_GITHUB_URL, …
        ├── features/
        ├── hooks/           # useToast, useDebounce, usePrevious
        ├── navigation/      # RootNavigator, MainTabs, types, linking
        ├── providers/       # AppProviders, ThemeProvider, ToastProvider, QueryProvider
        ├── screens/         # Home, Components, FormExample, Details, Settings
        ├── services/        # api/ (axios + query client), api/example, index
        ├── storage/         # MMKV instance + helpers
        ├── store/           # Zustand stores
        ├── theme/           # colors, spacing, typography, radii, shadows, themes
        ├── types/
        ├── utils/           # cn, date, strings
        ├── assets/          # logo.png (master) — re-exported to native by build-logo.py
        └── localization/
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

Two ways, same underlying flow (the RN CLI's `--template` flag):

### Option A — bundled CLI (recommended)

The `create-rn87-app` CLI in `cli/` is a thin wrapper that calls the RN CLI for you and runs `yarn install` (and `pod install` on macOS) afterwards.

```sh
# from anywhere, pointing at this template by path:
node /path/to/HbnRnTemplate/cli/bin/create-rn87-app.js MyApp /tmp/my-app

# or, from the template root, with a relative path:
node cli/bin/create-rn87-app.js MyApp

# pick a different package manager:
node cli/bin/create-rn87-app.js MyApp --pm npm
```

CLI flags:

| Flag                               | Description                                         |
| ---------------------------------- | --------------------------------------------------- |
| `<name>`                           | PascalCase project name (required).                 |
| `[target]`                         | Directory to scaffold into. Defaults to `./<name>`. |
| `--pm`, `--package-manager <name>` | `yarn` (default), `npm`, or `pnpm`.                 |
| `--template <path-or-package>`     | Override the template location.                     |
| `--verbose`                        | Stream subprocess output.                           |
| `--dry-run`                        | Print what would happen without writing anything.   |
| `-h`, `--help`                     | Show CLI help.                                      |
| `-v`, `--version`                  | Print the CLI version.                              |

`HBN_RN_TEMPLATE` env var sets the default template when the CLI is run outside the template directory.

### Option B — raw RN CLI

```sh
npx @react-native-community/cli@latest init MyApp \
  --template /path/to/HbnRnTemplate \
  --pm yarn
```

When this template is published to npm as `hbn-rn-template`, the `--template` flag becomes optional (it'll default to the package name).

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
  --template . --pm yarn --skip-install

# Confirm the assets travelled through the rename:
ls /tmp/logo-verify/VerifyLogo/ios/VerifyLogo/Images.xcassets/AppIcon.appiconset/ | head -3
ls /tmp/logo-verify/VerifyLogo/android/app/src/main/res/mipmap-xxxhdpi/
cat /tmp/logo-verify/VerifyLogo/android/app/src/main/res/drawable/splash_screen.xml | head -3
# And there should be zero leftover `HbnRnTemplate` references:
grep -rln "HbnRnTemplate" /tmp/logo-verify/VerifyLogo 2>/dev/null
# expected: (empty)

# Clean up:
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

- `package.json` carries `author: { name: "Hussam Bin Noor", url: "https://github.com/hussambinnoor" }` and a `repository` block pointing at the source. These survive the scaffold rename pass because the RN CLI's `replacePlaceholderWithPackageName` only touches the `placeholderName` string.
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

- The CLI expects the template to be published to npm as `hbn-rn-template` for the default flow. Until then, set `HBN_RN_TEMPLATE` or pass `--template <path>`.
- The template's `customConditions: ["react-native"]` only takes effect under a `moduleResolution: "bundler"` TypeScript config — this is set by default.
- `node_modules/`, `ios/Pods/`, `android/build/`, `vendor/`, and `yarn.lock` are intentionally **excluded** from `template/`. The RN CLI's copy step chokes on them with `paths[3] undefined` if they're present. Re-generated on first install in each new app.

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
node cli/bin/create-rn87-app.js MyApp /tmp/my-app --template . --skip-install
```

### Scaffold fails with `"Received malformed response from registry for '.'"`

**Cause.** The CLI is treating the value of `--template` as an npm package name instead of a local path. The wrapper CLI needs to forward `--template` to the underlying `init` call.

**Fix.**

```sh
# Pass an absolute path, not a relative one, and confirm the wrapper forwards it:
node cli/bin/create-rn87-app.js MyApp /tmp/my-app \
  --template "$(pwd)" --verbose
# The "template:" line in the output should print the absolute path,
# not the literal ".".
```

### Scaffold fails with `"Target directory already exists and is not empty"`

**Cause.** A previous scaffold run left files behind (a partial install, a leftover `MyApp` dir, etc.).

**Fix.**

```sh
# Either remove the dir, or pick a fresh target:
rm -rf /tmp/my-app/MyApp          # only if you're sure
# or:
node cli/bin/create-rn87-app.js MyApp /tmp/my-app-fresh --template .
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
# Strip build artifacts out of the template — they're regenerated on first install:
rm -rf template/ios/Pods template/ios/build
rm -rf template/android/build template/android/app/build
rm -rf template/node_modules template/vendor
rm -f  template/yarn.lock
# Verify nothing's left:
find template -maxdepth 2 -name "Pods" -o -name "build" -o -name "node_modules" 2>/dev/null
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

## License

MIT — see [LICENSE](LICENSE) (TBD by the maintainer).
