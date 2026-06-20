from profiles import User, NGO, Admin
from system import EcoLoopPlatform

print("--- Welcome to the Eco-Loop Backend Console ---")

# Initialize the EcoLoopPlatform, booting the central database
server = EcoLoopPlatform()

# Creating a User
everyday_citizen = User("Alice", "alice@example.com", "555-0999", "123 Service Road, Chembur")
# Creating a NGO
green_earth = NGO("Green Earth Foundation", "contact@greenearth.org", "555-0199", "NGO-1042")
# Creating an Admin
system_admin = Admin("Roshan", "admin@ecoloop.com", "555-0000", 5)

server.register_account(everyday_citizen)   
server.register_account(green_earth)
server.register_account(system_admin)

server.view_database()

server.database["alice@example.com"].request_pickup("Two broken laptops and a monitor")
server.database["contact@greenearth.org"].accept_pickup()