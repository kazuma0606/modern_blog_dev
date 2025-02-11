# 📌 実行コマンドまとめ

## **🚀 1️⃣ PostgreSQL の起動（Docker Compose）**
📌 **コンテナを起動**
```sh
docker-compose up -d
```
📌 **コンテナの起動確認**
```sh
docker ps
```
📌 **PostgreSQL に接続**
```sh
docker exec -it blog_postgres psql -U blog_user -d blog_db
```
📌 **コンテナの停止**
```sh
docker-compose down
```

---

## **🚀 2️⃣ Prisma のセットアップ**
📌 **Prisma をインストール**
```sh
npm install @prisma/client
npm install --save-dev prisma
```
📌 **Prisma の初期化**
```sh
npx prisma init
```
📌 **Prisma Client の生成**
```sh
npx prisma generate
```
📌 **Prisma Studio（GUI で DB 確認）を開く**
```sh
npx prisma studio
```

---

## **🚀 3️⃣ データベースのマイグレーション**
📌 **`.env` に `DATABASE_URL` を設定**
```env
DATABASE_URL="postgresql://blog_user:blog_pass@localhost:5432/blog_db"
```
📌 **マイグレーションの作成**
```sh
npx prisma migrate dev --name init
```
📌 **Prisma Studio を開いて確認**
```sh
npx prisma studio
```

---

## **🚀 4️⃣ NestJS の起動（バックエンド）**
📌 **NestJS のサーバーを起動**
```sh
npm run start
```
📌 **開発モードで起動（ホットリロード付き）**
```sh
npm run start:dev
```

---

## **🚀 5️⃣ Next.js の起動（フロントエンド）**
📌 **フロントエンドの開発サーバーを起動**
```sh
npm run dev
```

---

## **🚀 6️⃣ デプロイ & 本番環境での動作確認**
📌 **GitHub に Push（Railway に自動デプロイ）**
```sh
git add .
git commit -m "Deploy update"
git push origin main
```
📌 **本番環境での DB マイグレーション**
```sh
npx prisma migrate deploy
```
📌 **本番環境のログを確認**
```sh
railway logs
```

---

## **📌 まとめ**
✅ **Docker で PostgreSQL を起動 → Prisma で接続 → NestJS で API 起動！**  
✅ **Next.js のフロントエンドと統合し、Railway / Vercel でデプロイ！**  
✅ **このコマンドを順番に実行すれば、開発がスムーズに進む！💪🔥**

