# Pocket-Merchant-Demo
Энэхүү “Демо Апп” нь Покет үйлчилгээнд шинээр “Апп” үүсгэх жишээ прожект юм. Прожектийн үндсэн бүтэц болон сервер талын кодчилолыг ойлгосноор “мини-апп” -ийг Покет үйлчилгээнд хэрэгжүүлэх боломжтой болно.
#### Системийн шаардлага
1. **Сервер талын Javascript**
	- Node v13.5.0 болон түүнээс дээш хувилбар
2. **Javascript package менежер**
	- Npm v6.13.6 болон түүнээс дээш хувилбар
	```sh
	npm install
	```
#### Зааварчилгааs
Прожектийг ажиллуулах зааварчилгаа :
- **Прожектийг ажиллуулах**
	> Үндсэн фолдерт терминалаас дараах коммандыг ажиллуулна.
	```sh
	node server.js
	```
#### Прожектийн бүтэц
* merchant-example-project
 * assets
 * controller
 * views
* server.js
* settings.js
1. **merchan-exmaple-project** - фолдерт вебийн үндсэн код байршина.
	*  **assets** - вебийн UI, UX responsive стайл
	*  **controller** - вебийн ажиллах зарчим , event
	*  **views** - вебийн харагдац
2. **server.js** - merchant api хүсэлт
3. **settings.js** - тохиргоо
#### Тохиргоо хийх
Дараах ([settings.js](settings.js)) файл үүсгэн үндсэн тохиргоог хийнэ. **CLIENT_ID** , **CLIENT_SECRET** болон **POCKET_TOKEN_URL** pocket - оос өгнө.
```js
const data = {
 port : 3000,
 CLIENT_ID : <merchant_client_id>,
 CLIENT_SECRET : <merchant_client_secret_code>,
 POCKET_TOKEN_URL : <pocket_log_in_url>
}
module.exports.data = data;
```
#### Үндсэн ажиллагаа
1. Merchant service дуудах
2. Access Token авах
3. Invoice үүсгэх
4. Хэрэглэгчид төлбөр төлүүлэх цонх харуулах.
5. Хэрэглэгч төлбөр төлсөн тохиолдолд success харуулах
6. Webhook дуудах