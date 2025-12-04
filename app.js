const http = require("http");
const url = require("url");

// 先準備 5 個 3C 產品
const products = [
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
  },
  {
    "id": 3,
    "category": "Green Tea",
    "name": "四季春青茶",
    "price": 55,
    "stock": 150,
    "tags": ["清爽", "低糖推薦"],
    "image_url": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 4,
    "category": "Green Tea",
    "name": "蜂蜜綠茶",
    "price": 60,
    "stock": 95,
    "tags": ["自然甜", "夏天必喝"],
    "image_url": "https://images.unsplash.com/photo-1737640665064-652965b8edc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 5,
    "category": "Fruit Tea",
    "name": "百香果雙響果茶",
    "price": 75,
    "stock": 60,
    "tags": ["水果", "酸甜", "清爽"],
    "image_url": "https://images.unsplash.com/photo-1594136579292-d98588fe6429?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 6,
    "category": "Fruit Tea",
    "name": "鮮桔檸檬茶",
    "price": 75,
    "stock": 70,
    "tags": ["維C", "酸香", "回甘"],
    "image_url": "https://images.unsplash.com/photo-1660479148603-ab86f632c602?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 7,
    "category": "Coffee",
    "name": "黑糖拿鐵",
    "price": 80,
    "stock": 40,
    "tags": ["咖啡", "奶香", "微甜"],
    "image_url": "https://images.unsplash.com/photo-1620360289100-030b032e5a27?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 8,
    "category": "Coffee",
    "name": "美式咖啡",
    "price": 55,
    "stock": 110,
    "tags": ["無奶", "醒腦", "濃香"],
    "image_url": "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 9,
    "category": "Yogurt Drink",
    "name": "草莓冰淇淋",
    "price": 90,
    "stock": 55,
    "tags": ["濃郁", "香甜", "冰沙"],
    "image_url": "https://images.unsplash.com/photo-1633933358116-a27b902fad35?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 10,
    "category": "Smoothie",
    "name": "藍莓鬆餅",
    "price": 120,
    "stock": 30,
    "tags": ["甜美", "果肉", "人氣限定"],
    "image_url": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759"
  },
  {
    "id": 99,
    "category": "Premium Set（頂級套餐）",
    "name": "BlueDay 星辰宇宙尊爵夢幻套餐",
    "price": 120000,
    "stock": 1,
    "tags": ["尊榮體驗", "宇宙級奢華"],
    "image_url": "https://images.unsplash.com/photo-1683744129492-327e220b607e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 108,
    "category": "Fusion Cocktail Bar Special",
    "name": "Tropical Dragon Paradise Mojito Set（熱帶龍果天堂莫西多套餐）",
    "price": 16800,
    "stock": 12,
    "tags": ["微醺清爽", "Bar主題", "熱帶水果感爆棚"],
    "image_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1257&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];


const server = http.createServer(function (req, res) {
  // 統一回應都是 JSON
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // Health API
  if (req.url === "/api/health" && req.method === "GET") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        status: "OK",
        timestamp: new Date().toISOString(),
      })
    );
    return;
  }

  // 首頁：列出簡單的 API 介紹
  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "歡迎使用 API 服務",
        description: "這是一個示範用的 3C 產品查詢 API。",
        endpoints: {
          health: {
            path: "/api/health",
            method: "GET",
            description: "檢查 API 是否正常運作",
          },
          products: {
            path: "/api/products?min=5000&max=20000",
            method: "GET",
            description: "用價格區間篩選產品（min / max 都是選填）",
          },
        },
      })
    );
    return;
  }

  // 其他路徑用 url.parse 來處理（例如 /api/products?min=...&max=...）
  const parsedUrl = url.parse(req.url, true);

  // 只處理 /api/products 這個路徑
  if (parsedUrl.pathname === "/api/products" && req.method === "GET") {
    // 取得 query 參數：?min=5000&max=20000
    const min = Number(parsedUrl.query.min) || 0;
    const max = Number(parsedUrl.query.max) || Infinity;

    // 篩選出在區間內的產品
    const matched = products.filter(function (p) {
      return p.price >= min && p.price <= max;
    });

    // 準備要回傳的 JSON
    const result = {
      min,
      max,
      totalProducts: products.length,
      matchedCount: matched.length,
      matchedProducts: matched, // 如果只想教「數量」，這行也可以先拿掉
    };

    res.statusCode = 200;
    res.end(JSON.stringify(result));
    return;
  }

  // 其他沒對到的路徑
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "找不到路徑" }));
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});