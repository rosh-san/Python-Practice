contacts = {} # Initialize an empty dictionary to store contacts
while True:
    print("Contact Book Menu:")
    print("1. Add Contact")
    print("2. View Contacts")
    print("3. Search Contact")
    print("4. Delete Contact")
    print("5. Exit")

    choice = input("Enter your choice (1-5): ")

    if choice == '1': # Add a new contact
        name = input("Enter contact name: ")
        phone = input("Enter contact phone number: ")
        contacts[name] = phone
        print(f"Contact '{name}' added successfully.")

    elif choice == '2': # View all contacts
        if contacts: # Checks if there are any contacts to display, if not empty dictionary is considered as True
            print("Contacts:")
            for name, phone in contacts.items(): # .items() method returns a view object that displays a list of a dictionary's key-value tuple pairs.
                print(f"{name}: {phone}") 
        else:
            print("No contacts found.")

    elif choice == '3': # Search for a contact
        search_name = input("Enter the name to search: ")
        if search_name in contacts: # Checks if the search_name exists in the contacts dictionary.
            print(f"{search_name}: {contacts[search_name]}")
        else:
            print(f"Contact '{search_name}' not found.")

    elif choice == '4': # Delete a contact
        delete_name = input("Enter the name to delete: ")
        if delete_name in contacts: 
            del contacts[delete_name] # Deletes the key-value pair from the contacts dictionary using the del statement.
            print(f"Contact '{delete_name}' deleted successfully.")
        else:
            print(f"Contact '{delete_name}' not found.")

    elif choice == '5': # Exit the program
        print("Exiting the contact book. Goodbye!")
        break

    else:
        print("Invalid choice. Please try again.")