# Pocket-Merchant-Demo
Энэхүү “Демо Апп” нь Покет аппликейшинд шинээр Мини Апп үүсгэх жишээ төсөл юм. Төслийн үндсэн бүтэц болон сервер талын кодчилолыг ойлгосноор “Мини-апп” -ийг Покет үйлчилгээнд хэрэгжүүлэх боломжтой болно.

#### Системийн шаардлага
1. **Сервер талын Javascript**
	- Node v13.5.0 болон түүнээс дээш хувилбар
2. **Javascript package менежер**
	- Npm v6.13.6 болон түүнээс дээш хувилбар
	```sh
	npm install
	```

#### Зааварчилгаа
Төслийг ажиллуулах зааварчилгаа :
- **Төслийг ажиллуулах**
	> Үндсэн фолдерт терминалаас дараах коммандыг ажиллуулна.
	```sh
	node server.js
	```

#### Төслийн бүтэц
* mini-app-example
 	* assets
 	* views
    * server.js
    * settings.js
    * client.js
    * data.json
1. **mini-app-exmaple** - фолдерт вебийн үндсэн код байршина.
	*  **assets** - вебийн UI, UX responsive загвар
	*  **assets/main.js** - веб клинт программ 
	*  **assets/pocket.js** - webView-ээс Покет аппликейшин руу хандах Java script сан (sdk)
	*  **views** - вебийн харагдац
2. **server.js** - merchant backend сервер программ
3. **client.js** - merchant backend нь CLIENT_ID, CLIENT_SECRET ашиглан token авах хүсэлт илгээх сан
4. **settings.js** - тохиргоо

#### Тохиргоо хийх
Дараах ([settings.js](settings.js)) файл үүсгэн үндсэн тохиргоог хийнэ. **CLIENT_ID** , **CLIENT_SECRET**, **POCKET_TOKEN_URL**, **INVOICE_CREATE_URL** хувьсагчуудыг тохируулна. Эдгээр хувьсагчийн утгуудыг Покет системд мерчантаар бүртгүүлэхдээ авна. 
```js
const data = {
 port : 3000,
 CLIENT_ID : <merchant_client_id>,
 CLIENT_SECRET : <merchant_client_secret_code>,
 POCKET_TOKEN_URL : <pocket_log_in_url>,
 INVOICE_CREATE_URL: <invoice_creation_url>
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
