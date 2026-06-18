class Account:
    def __init__(self, name: str, email: str, phone: str):
        self.name = name
        self.email = email
        self.phone = phone

    def login(self) -> None:
        print(f"\n[System Log]: {self.name} ({self.email}) has logged into Eco-Loop.")