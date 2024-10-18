const express = require('express');
const cors = require('cors');  // CORSパッケージをインポート
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// CORS設定: 特定のオリジンのみを許可
app.use(cors({
    origin: 'http://127.0.0.1:5500',  // 許可するオリジン
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // 許可するHTTPメソッド
    allowedHeaders: ['Content-Type', 'Authorization'],  // 許可するヘッダー
    credentials: true  // 必要に応じてクレデンシャルを許可
}));

// Body Parserの設定
app.use(bodyParser.json());

// すべてのルートでプリフライトリクエストを許可
app.options('*', cors());

// ルートの定義
app.post('/reservations', (req, res) => {
    console.log('Received data:', req.body);
    res.status(200).json({ message: 'Reservation received successfully', data: req.body });
});

// サーバーの起動
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
