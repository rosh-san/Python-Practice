# 1. The Blueprint for a Single Person
class Contact:
    def __init__(self, name: str, phone: str, email: str, role: str):
        self.name = name
        self.phone = phone
        self.email = email
        self.role = role

# 2. The Blueprint for the Application
class ContactBook:
    def __init__(self):
        self.contacts = {}

    def add_contact(self, name: str, phone: str, email: str, role: str) -> None:
        # we create a new 'contact' object using the blueprint.
        new_contact = Contact(name, phone, email, role)

        # we add the new contact to the contact book.
        self.contacts[name] = new_contact
        print(f"Contact '{name}' with '{role}' role added successfully.")

    def view_contacts(self) -> None:
        if self.contacts:
            print("Contact List:")
            for name, contact in self.contacts.items():
                print(f"Name: {contact.name} | Phone: {contact.phone} | Email: {contact.email} | Role: {contact.role}")
        else:
            print("No contacts found.")
            
    def search_contact(self, search_name: str) -> None:
        if search_name in self.contacts:
            contact = self.contacts[search_name]
            print(f"Contact found: \nName: {contact.name} | Phone: {contact.phone} | Email: {contact.email} | Role: {contact.role}")
        else:
            print(f"Contact '{search_name}' not found.")
        
    def delete_contact(self, delete_name: str) -> None:
        if delete_name in self.contacts:
            del self.contacts[delete_name]
            print(f"Contact '{delete_name}' deleted successfully.")
        else:
            print(f"Contact '{delete_name}' not found.")

my_app = ContactBook() # we create an instance of the ContactBook class to use its methods.

while True:
    print("Contact Book Menu:")
    print("1. Add Contact")
    print("2. View Contacts")
    print("3. Search Contact")
    print("4. Delete Contact")
    print("5. Exit")

    choice = input("Enter your choice (1-5): ")

    if choice == '1':
        name = input("Enter contact name: ") 
        phone = input("Enter contact phone number: ")
        email = input("Enter contact email: ")
        role = input("Enter contact role: ")
        my_app.add_contact(name, phone, email, role)

    elif choice == '2':
        my_app.view_contacts()

    elif choice == '3':
        if my_app.contacts:
            search_name = input("Enter the name to search: ")
            my_app.search_contact(search_name)
        else:
            print("No contacts found.")

    elif choice == '4':
        if my_app.contacts:
            delete_name = input("Enter the name to delete: ")
            my_app.delete_contact(delete_name)
        else:
            print("No contacts found.")

    elif choice == '5':
        print("Exiting the contact book. Goodbye!")
        break

    else:
        print("Invalid choice. Please try again.")