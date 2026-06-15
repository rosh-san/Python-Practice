contacts = {}
#contact book using functions to perform operations on the contact book.
def add_contact(name, phone):
    contacts[name] = phone
    print(f"Contact '{name}' added successfully.")

def view_contacts():
    if contacts:
        print("Contacts:")
        for name, phone in contacts.items():
            print(f"{name}: {phone}")
    else:
        print("No contacts found.")

def search_contact(search_name):
    if search_name in contacts:
        print(f"{search_name}: {contacts[search_name]}")
    else:
        print(f"Contact '{search_name}' not found.")

def delete_contact(delete_name):
    if delete_name in contacts:
        del contacts[delete_name]
        print(f"Contact '{delete_name}' deleted successfully.")
    else:
        print(f"Contact '{delete_name}' not found.")

while True: # This loop will continue to run until the user chooses to exit the program.
    print("Contact Book Menu:")
    print("1. Add Contact")
    print("2. View Contacts")
    print("3. Search Contact")
    print("4. Delete Contact")
    print("5. Exit")

    choice = input("Enter your choice (1-5): ")

    if choice == '1':
        name = input("Enter contact name: ") # taking inputs from user.
        phone = input("Enter contact phone number: ")
        add_contact(name, phone) # calling the add_contact function to add a new contact.

    elif choice == '2':
        view_contacts()

    elif choice == '3':
        search_name = input("Enter the name to search: ")
        search_contact(search_name)

    elif choice == '4':
        delete_name = input("Enter the name to delete: ")
        delete_contact(delete_name)

    elif choice == '5':
        print("Exiting the contact book. Goodbye!")
        break

    else:
        print("Invalid choice. Please try again.")