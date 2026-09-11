# Руководство по переводу RU → UZ (узбекская латиница)

## Орфография и стандарт
- Современная латиница (стандарт 2019 г., доработки 2023).
- Используется символ `oʻ`, `gʻ`, `ʻ` (модификатор «турецкая запятая» — U+02BB), а НЕ апостроф `'` и не `g'`/`o'`.
  - ✅ `oʻquvchi`, `oʻqituvchi`, `Oʻzbekiston`, `boʻlim`, `gʻalaba`
  - ❌ `o'quvchi`, `g'alaba`
- В коде в JSON/TS строках символ `ʻ` пишем как есть (UTF-8).

## Стиль
- Простой, живой узбекский. Так говорят учителя в обычной школе с детьми.
- Дети с F70 (лёгкая умственная отсталость) — короткие предложения, активный залог, без канцелярита.
- Никаких неестественных калек с русского. Если узбекское слово редкое — заменяй на разговорное:
  - «коррекционная школа» → `maxsus maktab` (не `korreksion maktab`).
  - «уроки СБО» → `ijtimoiy-maishiy moslashuv darslari` или короче `IMM darslari`. В UI лучше `amaliy hayot darslari` если контекст позволяет, но в академическом/научном тексте — `ijtimoiy-maishiy moslashuv`.
  - «цифровая грамотность» → `raqamli savodxonlik`.
  - «тренажёр» (приложения) → `mashq` или `mashq dasturi`. Когда речь о копии реального приложения — `Telegram mashqi`, `Gmail mashqi`.

## Базовый глоссарий

| Русский | Узбекский |
|---|---|
| Главная | Bosh sahifa |
| Программа | Dastur |
| Направления | Yoʻnalishlar |
| Уроки | Darslar |
| Урок | Dars |
| Модуль | Modul |
| Возможности | Imkoniyatlar |
| Контакты | Aloqa |
| О платформе | Platforma haqida |
| Для школ | Maktablar uchun |
| Для родителей | Ota-onalar uchun |
| Войти | Kirish |
| Выйти | Chiqish |
| Регистрация | Roʻyxatdan oʻtish |
| Начать обучение | Oʻqishni boshlash |
| Кабинет / Личный кабинет | Shaxsiy kabinet |
| Открыть | Ochish |
| Закрыть | Yopish |
| Смотреть | Koʻrish |
| Далее | Davom etish |
| Назад | Orqaga |
| Сохранить | Saqlash |
| Отмена | Bekor qilish |
| Удалить | Oʻchirish |
| Подтвердить | Tasdiqlash |
| Готово | Tayyor |
| Меню | Menyu |
| Поиск | Qidiruv |
| Найти | Topish |
| Ошибка | Xatolik |
| Загрузка… | Yuklanmoqda… |
| Узбекистан | Oʻzbekiston |
| Узбекский язык | Oʻzbek tili |
| Русский язык | Rus tili |
| Учитель | Oʻqituvchi |
| Педагог | Pedagog |
| Учитель СБО / дефектолог | Maxsus pedagog (defektolog) |
| Ребёнок | Bola |
| Дети | Bolalar |
| Ученик | Oʻquvchi |
| Родитель | Ota-ona |
| Школа | Maktab |
| Коррекционная школа | Maxsus maktab |
| Класс | Sinf |
| Платформа | Platforma |
| Учебная платформа | Oʻquv platformasi |
| Цифровая грамотность | Raqamli savodxonlik |
| Цифровые навыки | Raqamli koʻnikmalar |
| Цифровые сервисы | Raqamli xizmatlar |
| Покупки и рынки | Xaridlar va bozorlar |
| Средства связи | Aloqa vositalari |
| Здоровье и медицинская помощь | Salomatlik va tibbiy yordam |
| Природа и человек | Tabiat va inson |
| Госучреждения и организации | Davlat muassasalari va tashkilotlar |
| Госуслуги | Davlat xizmatlari |
| Действие | Harakat |
| Реальные действия | Haqiqiy harakatlar |
| Реальные ситуации | Haqiqiy hayot vaziyatlari |
| Сообщение | Xabar |
| Отправить | Yuborish |
| Написать | Yozish |
| Получатель | Qabul qiluvchi |
| Кому | Kimga |
| Тема (письма) | Mavzu |
| Эл. почта / email | E-pochta |
| Пароль | Parol |
| Имя | Ism |
| Фамилия | Familiya |
| Телефон | Telefon |
| Адрес | Manzil |
| Дата | Sana |
| Время | Vaqt |
| Город | Shahar |
| Адрес электронной почты | E-pochta manzili |
| Аккаунт | Hisob |
| Войти в аккаунт | Hisobga kirish |
| Согласие | Rozilik |
| Политика конфиденциальности | Maxfiylik siyosati |
| Пользовательское соглашение | Foydalanuvchi shartnomasi |
| Cookies / куки | Cookie fayllari |
| Прогресс | Yutuqlar |
| Завершено | Yakunlandi |
| Начато | Boshlandi |
| Не начато | Boshlanmagan |
| Заявка | Ariza |
| Оставить заявку | Ariza qoldirish |
| Поддержка | Yordam xizmati |
| Помощь | Yordam |
| Подсказка | Maslahat |
| Правило | Qoida |
| Ситуация | Vaziyat |
| Задание | Topshiriq |
| Тест | Test |
| Вопрос | Savol |
| Ответ | Javob |
| Правильно | Toʻgʻri |
| Неправильно | Notoʻgʻri |
| Попробовать снова | Yana urinib koʻrish |
| Продолжить | Davom etish |
| Перейти | Oʻtish |
| Раздел | Boʻlim |
| Часы (длительность) | Soat |
| Минута | Daqiqa |
| Сегодня | Bugun |
| Вчера | Kecha |
| Завтра | Ertaga |
| В сети | Onlayn |
| Только что | Hozirgina |
| Месяц назад | bir oy oldin |
| Звонок | Qoʻngʻiroq |
| Позвонить | Qoʻngʻiroq qilish |
| Принять | Qabul qilish |
| Отклонить | Rad etish |
| Чат | Chat |
| Корзина | Savatcha |
| В корзину | Savatchaga |
| Купить | Sotib olish |
| Заказать | Buyurtma berish |
| Оплатить | Toʻlash |
| Доставка | Yetkazib berish |
| Цена | Narx |
| Скидка | Chegirma |
| Отзывы | Sharhlar |
| Рейтинг | Reyting |
| Продавец | Sotuvchi |
| Товар | Tovar / mahsulot |
| Категория | Kategoriya |
| Аптека | Dorixona |
| Лекарство | Dori |
| Врач | Shifokor |
| Скорая помощь | Tez yordam |
| Безопасность | Xavfsizlik |
| Опасно | Xavfli |
| Внимание | Diqqat |

## Тренажёры (UI реальных приложений)
Используем реальную узбекскую локализацию этих приложений:

### Telegram (uz)
- Чат / Сообщения — `Xabarlar`
- Контакты — `Kontaktlar`
- Поиск — `Qidirish`
- Введите сообщение / Написать — `Xabar yozing…`
- Отправить — кнопка «Yuborish» (но обычно стрелка-иконка)
- В сети / был(а) недавно — `onlayn` / `yaqinda onlayn edi`

### WhatsApp (uz)
- Аналогично: `Xabar yozing…`, `Chatlar`, `Holat`, `Qoʻngʻiroqlar`

### Gmail / Mail.ru
- Написать — `Yozish`
- Входящие — `Kelgan xabarlar`
- Отправленные — `Yuborilganlar`
- Кому — `Kimga`
- Тема — `Mavzu`
- Отправить — `Yuborish`

### Uzum Market (uzum.uz реально на узбекском)
- Поиск товаров — `Tovarlarni qidirish`
- В корзину — `Savatchaga qoʻshish`
- Купить — `Sotib olish`
- Бесплатная доставка — `Bepul yetkazib berish`
- Сум — `soʻm`

### Yandex Market (тоже есть uz-версия)
- Аналогично, плюс `Buyurtmalarim`

### MyGov.uz (egov.uz — государственные услуги, есть uz)
- Услуги — `Xizmatlar`
- Заявка — `Ariza`
- Подать заявку — `Ariza topshirish`
- Документ — `Hujjat`
- Паспорт — `Pasport`
- ИНН — `STIR`

### Телефон / звонок
- Принять — `Qabul qilish`
- Отклонить — `Rad etish`
- Контакты — `Kontaktlar`
- Клавиатура — `Klaviatura`

## Имена собственные
- Названия модулей платформы — переводим (Покупки и рынки → Xaridlar va bozorlar).
- UQUVLI.UZ — не переводим (бренд).
- F70 — оставляем как есть (международная классификация).

## Числа и единицы
- «14 уроков» → `14 ta dars`
- «3 часа» → `3 soat`
- «5 направлений» → `5 ta yoʻnalish`
- «3 урока · 3 часа» → `3 ta dars · 3 soat`

## Плюрализация
Узбекский язык не имеет числового согласования как русский. Используем `N ta + существительное-в-единственном-числе`:
- 1 dars, 2 ta dars, 14 ta dars (всегда `ta + dars`, не меняется).
- Можно опускать `ta`: «14 dars» — тоже допустимо.

## Деликатные термины
- F70 (лёгкая умственная отсталость) — в Узбекистане в школах используется термин `aqliy zaifligi yengil darajada bolalar` или `oʻrganishda qiyinchilik bolalar`. Для медицинского контекста: `yengil aqliy zaiflik (F70)`. Для маркетинговой подачи: `oʻquvda qiyinchilik bolalar` (звучит мягче).
- «дети с особыми образовательными потребностями» → `maxsus taʼlim ehtiyojidagi bolalar`.
