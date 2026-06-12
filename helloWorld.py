print("Hello, World!")  

# Take input from the user 
a = input("Variable a: ")
b = input("Variable b: ")
#multiple inputs at once
# a, b = input("Variable a and b: ").split()

operation = input("Operation (+, -, *, /, %, **, //): ")

#perform calculations
if operation == "+":
    c = int(a) + int(b)
elif operation == "-":
    c = int(a) - int(b)
elif operation == "*":
    c = int(a) * int(b)
elif operation == "/":
    c = int(a) / int(b)
elif operation == "%":
    c = int(a) % int(b)
elif operation == "**":
    c = int(a) ** int(b)
elif operation == "//":
    c = int(a) // int(b)
else: c = "Invalid operation"

# print("Result:", c)
print(f"Result: {c}")