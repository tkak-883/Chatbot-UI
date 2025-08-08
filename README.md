# OpenAI Chat

OpenAI GPT を使用したシンプルなチャットアプリケーション

## セットアップ

1. 依存関係をインストール

```bash
npm install
```

2. 環境変数を設定

```bash
cp .env.example .env.local
```

3. OpenAI API キーを取得して設定

- https://platform.openai.com/api-keys で API キーを生成
- `.env.local` に API キーを設定

4. 開発サーバーを起動

```bash
npm run dev
```

5. http://localhost:3000 にアクセス

## 本番環境

```bash
npm run build
npm start
```

## 環境変数

```
OPENAI_API_KEY=sk-your-api-key-here
```

## 技術スタック

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API
