from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import sqlite3
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "spaceguard.db"


def get_connection():
    return sqlite3.connect(DB_PATH)


def init_db():
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                recipient_name TEXT NOT NULL,
                recipient_contact TEXT NOT NULL,
                city TEXT NOT NULL,
                event_type TEXT NOT NULL,
                risk_level TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )


def row_to_dict(row):
    return {
        "id": row[0],
        "recipientName": row[1],
        "recipientContact": row[2],
        "city": row[3],
        "eventType": row[4],
        "riskLevel": row[5],
        "message": row[6],
        "createdAt": row[7],
    }


class SpaceGuardHandler(SimpleHTTPRequestHandler):
    def end_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=True).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/api/alerts":
            with get_connection() as conn:
                rows = conn.execute(
                    """
                    SELECT id, recipient_name, recipient_contact, city, event_type,
                           risk_level, message, created_at
                    FROM alerts
                    ORDER BY id DESC
                    LIMIT 20
                    """
                ).fetchall()
            self.end_json(200, {"alerts": [row_to_dict(row) for row in rows]})
            return

        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/alerts":
            self.end_json(404, {"error": "Endpoint nao encontrado"})
            return

        length = int(self.headers.get("Content-Length", "0"))
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
        except json.JSONDecodeError:
            self.end_json(400, {"error": "JSON invalido"})
            return

        required = [
            "recipientName",
            "recipientContact",
            "city",
            "eventType",
            "riskLevel",
            "message",
        ]
        missing = [field for field in required if not str(payload.get(field, "")).strip()]
        if missing:
            self.end_json(400, {"error": "Campos obrigatorios ausentes", "fields": missing})
            return

        with get_connection() as conn:
            cursor = conn.execute(
                """
                INSERT INTO alerts (
                    recipient_name, recipient_contact, city, event_type,
                    risk_level, message
                ) VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    payload["recipientName"].strip(),
                    payload["recipientContact"].strip(),
                    payload["city"].strip(),
                    payload["eventType"].strip(),
                    payload["riskLevel"].strip(),
                    payload["message"].strip(),
                ),
            )
            alert_id = cursor.lastrowid
            row = conn.execute(
                """
                SELECT id, recipient_name, recipient_contact, city, event_type,
                       risk_level, message, created_at
                FROM alerts
                WHERE id = ?
                """,
                (alert_id,),
            ).fetchone()

        self.end_json(201, {"alert": row_to_dict(row)})


if __name__ == "__main__":
    init_db()
    server = ThreadingHTTPServer(("127.0.0.1", 4174), SpaceGuardHandler)
    print("SpaceGuard AI rodando em http://127.0.0.1:4174")
    server.serve_forever()
