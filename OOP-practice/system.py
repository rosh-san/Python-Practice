class EcoLoopPlatform:
    def __init__(self):
        # Central database Dictionary. 
        self.database = {}

    def register_account(self, new_account) -> None:
        # Using email as the key to prevent duplicates.
        self.database[new_account.email] = new_account
        print(f"[Platform Core]: Registered '{new_account.name}' into the system database.")

    def view_database(self) -> None:
        print("\n=== Eco-Loop Active Users ===")
        if not self.database:
            print("The database is currently empty.")
        else:
            for email, account in self.database.items():
                print(f"User: {account.name} | Email: {email}")
        print("=============================\n")