class Contact:
    def __init__(self, name, phone, email, role):
        self.name = name
        self.phone = phone
        self.email = email
        self.role = role

class ContactBook:
    def __init__(self):
        self.contact = {}

    def add_contact(self, name, phone, email, role) -> None:
        new_contact = Contact(name, phone, email, role)
        self.contact[name] = new_contact
        print(f"Contact '{name}' with role '{role}' added.")

    def view_contacts(self) -> None:
        if self.contact:
            print("All Contacts")
            for name, contacts in self.contact.items():
                print(f"Name: {contacts.name}, Phone: {contacts.phone}, Email: {contacts.email}, Role: {contacts.role}")
        else:
            print("nothing here")

    def search_contact(self, search_name) -> None:
        if search_name in self.contact:
            contact = self.contact[search_name]
            print(f"Name: {contact.name} | Phone: {contact.phone} | Email: {contact.email} | Role: {contact.role}")
        else:
            print("Not found")

    def delete_contact(self, delete_name) -> None:
        if delete_name in self.contact:
            del self.contact[delete_name]
            print(f"{delete_name} Deleted")
        else:
            print(f"{delete_name} not here")

my_app = ContactBook()

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
        search_name = input("Enter the name to search: ")
        my_app.search_contact(search_name)

    elif choice == '4':
        delete_name = input("Enter the name to delete: ")
        my_app.delete_contact(delete_name)

    elif choice == '5':
        print("Exiting the contact book. Goodbye!")
        break

    else:
        print("Invalid choice. Please try again.")