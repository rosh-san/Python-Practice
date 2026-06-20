from base_account import Account

class User(Account):
    def __init__(self, name: str, email: str, phone: str, address: str):
        super().__init__(name, email, phone)
        self.address = address

    def request_pickup(self, item_description: str) -> None:
        print(f"[User Action]: {self.name} requested a pickup for '{item_description}' at {self.address}.")

# The NGO Blueprint
class NGO(Account):
    def __init__(self, name: str, email: str, phone: str, reg_id: str):
        super().__init__(name, email, phone)
        self.reg_id = reg_id

    def accept_pickup(self) -> None:
        print(f"[NGO Action]: {self.name} has accepted a new e-waste pickup.")

# The Admin Blueprint
class Admin(Account):
    def __init__(self, name: str, email: str, phone: str, admin_level: int):
        super().__init__(name, email, phone)
        self.admin_level = admin_level

    def delete_user(self, user_to_delete: str) -> None:
        print(f"[{self.name} WARNING]: Permanently deleted user '{user_to_delete}'.")