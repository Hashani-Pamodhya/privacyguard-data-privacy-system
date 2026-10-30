
import sqlite3
import os

DATABASE_PATH = os.path.join(
    os.path.dirname(__file__),
    "privacyguard.db"
)

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():

    conn = get_db_connection()
    cursor = conn.cursor()

    # Personal data inventory table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS data_inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data_name TEXT NOT NULL,
            data_category TEXT NOT NULL,
            collection_purpose TEXT NOT NULL,
            storage_location TEXT NOT NULL,
            retention_period TEXT,
            access_level TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Privacy risk assessment table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS privacy_risks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            risk_name TEXT NOT NULL,
            description TEXT,
            likelihood INTEGER NOT NULL,
            impact INTEGER NOT NULL,
            risk_score INTEGER NOT NULL,
            risk_level TEXT NOT NULL,
            mitigation TEXT,
            status TEXT DEFAULT 'Open',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Consent management table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS consent_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data_subject TEXT NOT NULL,
            purpose TEXT NOT NULL,
            consent_status TEXT NOT NULL,
            consent_date DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Privacy incident table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS privacy_incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            incident_title TEXT NOT NULL,
            description TEXT,
            severity TEXT NOT NULL,
            incident_date DATE,
            status TEXT DEFAULT 'Open',
            corrective_action TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()

    print("PrivacyGuard database initialized successfully!")


def get_dashboard_stats():

    conn = get_db_connection()
    cursor = conn.cursor()

    stats = {}

    cursor.execute("SELECT COUNT(*) FROM data_inventory")
    stats["total_records"] = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM privacy_risks")
    stats["total_risks"] = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*) FROM privacy_incidents
        WHERE status = 'Open'
    """)
    stats["open_incidents"] = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM consent_records")
    stats["consent_records"] = cursor.fetchone()[0]

    conn.close()

    return stats

