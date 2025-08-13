# React + TypeScript + Vite

## プロジェクト概要
ReactのTypeScriptプロジェクトをViteで構築し、MUIのコンポーネントを利用したアプリケーションのサンプルです。TanStack Routerを使用して画面遷移を行い、React Hook FormとZodでフォームの入力チェックを行います。さらに、MUI Toolpadを利用して、MUIのコンポーネントを活用した開発体験を提供します。

## Getting Started
# プロジェクト作成する手順のメモ
```bash
npx create-vite@latest my-react-app --template react-ts 
cd my-react-app
npm install
npm install --save-dev eslint eslint-config-tseslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import
npm install --save-dev eslint-plugin-tseslint eslint-plugin-prettier eslint-config-prettier
npm install --save-dev @types/react @types/react-dom
npm install --save-dev vite-plugin-eslint
npm install --save-dev @vitejs/plugin-react
npm install --save-dev zod @tanstack/react-query @tanstack/react-router @mui/material @mui/icons-material @mui/lab
npm install --save-dev @mui/toolpad @mui/toolpad-react @mui/toolpad-react-router
npm install --save-dev react-hook-form @hookform/devtools
npm install --save-dev axios
npm install --save-dev biome  
```

# 技術スタック
| **ライブラリ名**            | **説明**                                                                                   |
|----------------------------|------------------------------------------------------------------------------------------|
| React                      | UIライブラリ                                                                              |
| React Hook Form            | フォームの状態管理ライブラリ                                                              |
| Zod                        | スキーマバリデーションライブラリ                                                          |
| TanStack Query             | データフェッチングライブラリ                                                              |
| TanStack Router            | ルーティングライブラリ                                                                    |
| MUI                        | UIコンポーネントライブラリ                                                                |
| Toolpad                    | MUIのコンポーネントを利用し、TanStack Routerによる画面遷移のサンプルを提供                |
| React Hook Form Devtools   | React Hook Formのデバッグツール                                                          |
| ESLint                     | コード品質維持のための静的解析ツール                                                     |
| Prettier                   | コードフォーマッター                                                                      |
| Biome                      | JavaScript/TypeScriptの静的解析ツール                                                     |
| Axios                      | HTTPクライアントライブラリ                                                               |

# 画面一覧

| **画面名**         | **説明**                                                                                       |
|--------------------|----------------------------------------------------------------------------------------------|
| Login              | MUIのSignInPageを利用した独自ログイン画面のサンプル                                            |
| _layout            | MUIのDashboardLayoutによりレイアウトコンポーネントのサンプル                                    |
| User               | ユーザー一覧画面。TanStack Routerによる画面遷移のサンプル                                      |
| UserModal          | ユーザー編集画面をモーダルで表示するサンプル。RHFによる入力チェックも含む                       |
| UserDirty          | RHFのisDirty属性により、編集後の確認画面のサンプル　　　　                                  |
| UserValidation     | Zodで入力チェックし、独自で項目のステータス管理を行うサンプル                                  |
| UserIndexError     | 一覧画面でデータ取得時のエラーハンドリングサンプル                                             |
| UserFindError      | 編集画面でデータ取得時のエラーハンドリングサンプル                                             |
| UserSaveError      | 編集画面でデータ保存時のエラーハンドリングサンプル                                             |

# 共通機能（hooks）

| **機能名**     | **説明**                                                                                                 |
|----------------|--------------------------------------------------------------------------------------------------------|
| Notification   | 通知を管理するコンテキストプロバイダーと、通知表示用ダイアログコンポーネント。全画面で統一的な通知手段を提供 |
| Loading        | useQueryやuseMutationの非同期通信時に自動でローディング表示を行う共通Hooks                               |
| RoleAccess     | サイドメニューのロールによるフィルタリングや、画面アクセス時の権限制御を行う機能                         |

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
