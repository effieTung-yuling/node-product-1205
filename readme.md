# API 服務範本

這是一個使用 Node.js 原生 `http` 模組開發的簡單 API 服務，提供健康檢查和商品查詢功能。

## 功能特色

- ✅ 純 Node.js 實作，無需任何第三方套件
- ✅ RESTful API 設計
- ✅ CORS 支援
- ✅ 健康檢查端點
- ✅ 商品查詢 API（支援價格區間篩選）

## 啟動服務

直接執行即可，無需安裝任何套件：

```bash
node server.js
```

伺服器會在 `http://localhost:3000` 啟動

## API 端點

### 1. 首頁

```
GET /
```

回應：

```json
{
  "message": "歡迎使用 API 服務",
  "endpoints": {
    "health": "/api/health",
    "products": "/api/products?min=5000&max=20000"
  }
}
```

### 2. 健康檢查

```
GET /api/health
```

回應：

```json
{
  "status": "OK",
  "timestamp": "2025-11-18T12:00:00.000Z"
}
```

### 3. 商品查詢

支援價格區間篩選，使用 query 參數 `min` 和 `max`。

```
GET /api/products
GET /api/products?min=5000&max=20000
GET /api/products?min=10000
GET /api/products?max=10000
```

回應範例：

```json
{
  "min": 5000,
  "max": 20000,
  "totalProducts": 5,
  "matchedCount": 3,
  "matchedProducts": [
      {
    "id": 1,
    "category": "Milk Tea",
    "name": "珍珠奶茶",
    "price": 75,
    "stock": 120,
    "tags": ["招牌", "甜", "人氣"],
    "image_url": "https://images.unsplash.com/photo-1718065598477-505b9c2e764d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 2,
    "category": "Milk Tea",
    "name": "抹茶拿鐵",
    "price": 85,
    "stock": 80,
    "tags": ["布丁", "甜點口感", "人氣"],
    "image_url": "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },....
  ]
}
```

**參數說明：**
- `min`：最低價格（選填，預設為 0）
- `max`：最高價格（選填，預設為無上限）


## 專案結構

```
backend/
├── server.js      # Node.js 原生 HTTP 伺服器
├── package.json   # 專案設定
└── README.md     # 說明文件
```

## 技術特色

- 使用 Node.js 原生 `http` 模組
- 不依賴任何 npm 套件
- 程式碼簡潔易懂
- 適合教學與學習

## 部署到 Zeabur

### 方法一：透過 GitHub 部署（推薦）

1. **將專案推送到 GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **登入 Zeabur**
   - 前往 [Zeabur](https://zeabur.com/)
   - 使用 GitHub 帳號登入

3. **建立新專案**
   - 點擊「Create Project」
   - 選擇「Deploy New Service」
   - 選擇「GitHub」

4. **選擇 Repository**
   - 授權 Zeabur 存取你的 GitHub
   - 選擇此專案的 repository
   - 選擇 `main` 分支

5. **自動部署**
   - Zeabur 會自動偵測 Node.js 專案
   - 自動執行 `npm start` 啟動服務
   - 等待部署完成（約 1-2 分鐘）

6. **取得網址**
   - 部署成功後，點擊「Generate Domain」
   - 複製網址即可使用（例如：`https://your-app.zeabur.app`）

### 測試部署是否成功

```bash
# 健康檢查
curl https://your-app.zeabur.app/api/health

# 商品查詢
curl https://your-app.zeabur.app/api/products?min=5000&max=20000
```

### 注意事項

- Zeabur 免費方案每月有使用額度限制
- 部署後環境變數 `PORT` 會自動設定
- 每次推送到 `main` 分支會自動觸發重新部署


## 錯誤處理

API 會回傳適當的 HTTP 狀態碼和錯誤訊息：

- `200`: 成功
- `404`: 找不到資料
- `500`: 伺服器錯誤

錯誤回應格式：

```json
{
  "error": "錯誤類型",
  "message": "錯誤訊息"
}
```

## 授權

MIT
