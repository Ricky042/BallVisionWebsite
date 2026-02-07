# backend/view_db.py
from app import models, database
from sqlalchemy.orm import Session

def main():
    # Create a database session
    db: Session = database.SessionLocal()
    
    try:
        # Query all users
        users = db.query(models.User).all()
        if not users:
            print("No users found.")
        for user in users:
            print(f"ID: {user.id}, Email: {user.email}, Hashed: {user.hashed_password}")
    finally:
        db.close()

if __name__ == "__main__":
    main()
