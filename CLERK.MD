# Clerk 認証と `User` テーブルの連携

## **📌 1️⃣ `User` テーブルは必要？**
✅ **必要！**
- Clerk は認証（Auth）を管理するが、アプリ内で `User` を管理するために **`User` テーブルが必須**。
- `Favorite` / `Bookmark` / `Comment` / `Notification` など、ユーザーに紐づくデータを管理するため、**DB 内にユーザーIDが必要**。

## **📌 2️⃣ Clerk 認証との連携フロー**

1️⃣ **フロントエンドで Clerk にログイン** → Clerk の `userId` を取得
2️⃣ **バックエンド（NestJS）に `userId` を送信**
3️⃣ **バックエンドで `User` テーブルを確認**
   - `userId` が **存在しない場合** → `User` を **新規作成**
   - `userId` が **既に存在する場合** → 何もしない


## **📌 3️⃣ `User` テーブルの設計**

```prisma
model User {
  id          String   @id @unique // Clerk の userId を格納
  name        String?  @db.VarChar(255)
  mail_address String  @unique @db.VarChar(255)
  role        Role     @default(USER)
  createdAt   DateTime @default(now()) @db.Timestamp(0)
  updatedAt   DateTime @updatedAt @db.Timestamp(0)
  
  Favorite    Favorite[]
  Bookmark    Bookmark[]
}

enum Role {
  ADMIN
  USER
}
```

## **📌 4️⃣ 初回ログイン時に `User` を作成**

🔹 **バックエンド (NestJS) の `auth.service.ts`**

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import Clerk from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async syncUserWithClerk(userId: string) {
    // Clerk からユーザー情報を取得
    const clerkUser = await Clerk.users.getUser(userId);

    // DB にユーザーが存在するか確認
    let user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // 存在しない場合は作成
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          id: clerkUser.id,
          name: clerkUser.firstName ?? '',
          mail_address: clerkUser.emailAddresses[0]?.emailAddress ?? '',
        },
      });
    }

    return user;
  }
}
```

## **📌 5️⃣ フロントエンドで `Clerk` のユーザーを取得**

🔹 **Next.js (`auth.ts`)**

```ts
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export const useSyncUser = async () => {
  const { user } = useUser();

  if (user) {
    await axios.post("/api/auth/sync", { userId: user.id });
  }
};
```

## **📌 6️⃣ まとめ**
✅ **Clerk の `userId` を `User` テーブルの `id` に保存**
✅ **初回ログイン時に `User` をDBに同期**
✅ **以降、DBの `User` テーブルを `userId` で参照可能**
✅ **アプリの `Favorite` / `Bookmark` / `Comment` は `User` の `id` を基に管理**

👉 **Clerk の認証機能と Prisma のDB管理を統合し、シームレスな認証連携を実現！🚀🔥**

