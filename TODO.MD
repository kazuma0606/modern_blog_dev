# TODO: 追加のDB要件

## **✅ 必須データテーブル**
### **1️⃣ `User`（ユーザー管理）**
- [ ] 管理者・一般ユーザーの区別（`role: ADMIN | USER`）
- [ ] `いいね / Bookmark` のリレーションを設定

```prisma
model User {
  id          Int      @id @default(autoincrement())
  name        String   @db.VarChar(255)
  mail_address String  @unique @db.VarChar(255)
  password    String   @db.VarChar(255)
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

### **2️⃣ `Page`（記事管理）**
- [ ] 記事の `title` / `description` / `tags` を保存
- [ ] 記事内容を `Markdown / MDX` で保存
- [ ] `createdAt` / `updatedAt` を記録
- [ ] `いいね / Bookmark` の数を取得

```prisma
model Page { 
  contents_id Int        @id @default(autoincrement())
  title       String     @db.VarChar(255)
  pages       String     @db.Text
  status      Status     @default(NOT_STORED)
  tags        String[]
  description String?
  createdAt   DateTime   @default(now()) @db.Timestamp(0)
  updatedAt   DateTime   @updatedAt @db.Timestamp(0)
  
  Favorite    Favorite[]
  Bookmark    Bookmark[]
}

enum Status {
  NOT_STORED
  IN_PROGRESS
  COMPLETED
}
```

### **3️⃣ `Favorite`（いいね管理）**
```prisma
model Favorite {
  id        Int      @id @default(autoincrement())
  userId    Int?     // NULL 許可（匿名ユーザー対応）
  pageId    Int
  page      Page     @relation(fields: [pageId], references: [contents_id])
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

### **4️⃣ `Bookmark`（ブックマーク管理）**
```prisma
model Bookmark {
  id        Int      @id @default(autoincrement())
  userId    Int?     // NULL 許可（匿名ユーザー対応）
  pageId    Int
  page      Page     @relation(fields: [pageId], references: [contents_id])
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

---

## **⭕ 拡張機能（追加予定）**
### **5️⃣ `Comment`（コメント機能）**
```prisma
model Comment {
  id        Int      @id @default(autoincrement())
  userId    Int
  pageId    Int
  parentId  Int?     // NULL ならトップレベルのコメント
  content   String   @db.Text
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
  page      Page     @relation(fields: [pageId], references: [contents_id])
  parent    Comment? @relation(fields: [parentId], references: [id])
}
```

### **6️⃣ `Notification`（通知機能）**
```prisma
model Notification {
  id        Int      @id @default(autoincrement())
  userId    Int
  message   String   @db.Text
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
}
```

### **7️⃣ `Tag`（タグ管理）**
```prisma
model Tag {
  id   Int    @id @default(autoincrement())
  name String @unique
  
  PageTag PageTag[]
}

model PageTag {
  pageId Int
  tagId  Int
  
  page Page @relation(fields: [pageId], references: [contents_id])
  tag  Tag  @relation(fields: [tagId], references: [id])
  
  @@id([pageId, tagId]) // 複合主キー
}
```

### **8️⃣ `Analytics`（アクセス解析）**
```prisma
model Analytics {
  id        Int      @id @default(autoincrement())
  pageId    Int
  viewCount Int      @default(0)
  uniqueVisitors Int @default(0)
  createdAt DateTime @default(now())
  
  page      Page     @relation(fields: [pageId], references: [contents_id])
}
```

---

## **🔥 次のアクション**
- [ ] **`User` / `Page` / `Favorite` / `Bookmark` をベースに `prisma migrate dev` を実行！**
- [ ] **API を作成し、`いいね / Bookmark / コメント` を操作できるようにする！**
- [ ] **拡張するなら `Comment` / `Tag` / `Notification` も追加！**

