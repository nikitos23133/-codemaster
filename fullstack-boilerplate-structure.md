codemaster/
├── client/                 # React фронтенд
│   ├── src/
│   │   ├── components/     # UI компоненты
│   │   ├── pages/          # Страницы приложения
│   │   ├── services/       # API клиенты
│   │   └── App.js          # Основной компонент
│   └── Dockerfile
├── server/                 # Node.js бэкенд
│   ├── src/
│   │   ├── config/        # Конфигурация
│   │   ├── models/        # MongoDB модели
│   │   ├── routes/        # Express роутеры
│   │   └── app.js         # Основное приложение
│   └── Dockerfile
├── infra/                  # Terraform конфигурация
│   ├── main.tf            # Основная конфигурация
│   ├── variables.tf       # Переменные
│   └── modules/           # Модули AWS
├── scripts/               # Вспомогательные скрипты
│   ├── deploy.sh          # Скрипт деплоя
│   └── backup.sh          # Резервное копирование
├── .github/               # CI/CD workflows
│   └── workflows/
│       └── deploy.yml
└── docker-compose.yml     # Локальная разработка
