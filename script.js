document.addEventListener('DOMContentLoaded', () => {
    // ダミーデータとしての店舗情報
    const dummySalons = [
        { id: 1, name: '東京店' },
        { id: 2, name: '大阪店' },
        { id: 3, name: '名古屋店' }
    ];

    // ダミーデータとしてのサービス情報と詳細
    const dummyServices = {
        1: [
            { id: 1, name: 'カット', price: '3000円', duration: '1時間', description: 'スタイリストによる基本カットサービス。' },
            { id: 2, name: 'カラー', price: '5000円', duration: '2時間', description: '全体カラーリングサービス。' },
            { id: 3, name: 'パーマ', price: '6000円', duration: '2.5時間', description: 'スタイリストによるパーマ施術。' }
        ],
        2: [
            { id: 1, name: 'カット', price: '3500円', duration: '1時間', description: '大阪店で提供するカットサービス。' },
            { id: 2, name: 'トリートメント', price: '4500円', duration: '1.5時間', description: '髪のトリートメントサービス。' }
        ],
        3: [
            { id: 1, name: 'カット', price: '3200円', duration: '1時間', description: '名古屋店のカットサービス。' },
            { id: 2, name: 'ヘッドスパ', price: '4000円', duration: '1.5時間', description: 'リラクゼーションヘッドスパ。' }
        ]
    };

    // 店舗情報をフォームに追加
    const salonSelect = document.getElementById('salon');
    dummySalons.forEach(salon => {
        const option = document.createElement('option');
        option.value = salon.id;
        option.textContent = salon.name;
        salonSelect.appendChild(option);
    });

    // 初期状態で最初の店舗のサービス情報を表示
    const initialSalonId = dummySalons[0].id;
    const serviceSelect = document.getElementById('service');
    dummyServices[initialSalonId].forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        serviceSelect.appendChild(option);
    });

    // 店舗選択時にサービス情報を更新
    salonSelect.addEventListener('change', (event) => {
        const selectedSalonId = event.target.value;
        const serviceSelect = document.getElementById('service');
        serviceSelect.innerHTML = '';  // 既存のオプションをクリア
        document.getElementById('service-details').innerHTML = '';  // サービス詳細もクリア

        if (dummyServices[selectedSalonId]) {
            dummyServices[selectedSalonId].forEach(service => {
                const option = document.createElement('option');
                option.value = service.id;
                option.textContent = service.name;
                serviceSelect.appendChild(option);
            });
        }
    });

    // サービス選択時にサービス詳細を表示
    document.getElementById('service').addEventListener('change', (event) => {
        const selectedSalonId = salonSelect.value;
        const selectedServiceId = event.target.value;
        const serviceDetailsDiv = document.getElementById('service-details');
        serviceDetailsDiv.innerHTML = '';  // 既存のサービス詳細をクリア

        if (dummyServices[selectedSalonId]) {
            const selectedService = dummyServices[selectedSalonId].find(service => service.id == selectedServiceId);
            if (selectedService) {
                serviceDetailsDiv.innerHTML = `
                    <strong>サービス名:</strong> ${selectedService.name}<br>
                    <strong>価格:</strong> ${selectedService.price}<br>
                    <strong>所要時間:</strong> ${selectedService.duration}<br>
                    <strong>説明:</strong> ${selectedService.description}
                `;
            }
        }
    });
});

document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault();  // デフォルトのフォーム送信を防止

    const reservationData = {
        salon: document.getElementById('salon').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    console.log(reservationData);  // 送信するデータを表示

    fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
        mode: 'cors'  // CORSリクエストを許可
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
});
