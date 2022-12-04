Cara Penggunaan:
1. Download source git
2. ketik di terminal npm install
3. Masukkan collection postman pada postman di folder git postman
4. ketik di terminal npm run dev / npm run start(untuk prod)

Route: 
POST localhost:3000/api/register (untuk register user)
POST localhost:3000/api/login (untuk register login user)

POST localhost:3000/api/duration (untuk register durasi)
GET localhost:3000/api/duration (untuk list durasi)

POST localhost:3000/api/consultation (untuk register tipe konsultasi(chat,video))
GET localhost:3000/api/consultation (untuk list consultation)

POST localhost:3000/api/register-schedule (untuk register schedule /jadwal ))
GET localhost:3000/api/schedule (untuk list schedule)

Ada cronjob jika waktunya sudah masuk schedule maka akan ada notif di console.lognya()

teknologi yang digunakan:
expresjs,
mongodb,
mongoose,
node-cron,
moment,
jwt