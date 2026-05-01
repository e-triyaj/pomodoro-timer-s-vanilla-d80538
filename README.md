pomodoro-timer-s-vanilla/
├── frontend/                # React uygulaması
│   ├── src/
│   │   ├── components/      # Timer, Controls, Stats
│   │   ├── hooks/           # useTimer, useAuth
│   │   ├── pages/
│   │   ├── services/        # API istekleri
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                 # FastAPI uygulaması
│   ├── app/
│   │   ├── api/             # Routerlar (sessions, auth, stats)
│   │   ├── core/            # config, security
│   │   ├── models/          # SQLAlchemy modelleri
│   │   ├── schemas/         # Pydantic şemaları
│   │   ├── services/
│   │   └── main.py
│   ├── alembic/             # DB migration
│   └── requirements.txt
├── docker-compose.yml
└── README.md