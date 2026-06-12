print("HELLO WORLD!!!")  

# Take input from the user 
a = input("Variable a: ")
b = input("Variable b: ")
operation = input("Operation (+, -, *, /, %, **, //): ")

#perform calculations
#Error-Handling with try-except block
try:
    #input to int conversion
    num_a=int(a)
    num_b=int(b)

    if operation == "+":
        c = num_a + num_b
    elif operation == "-":
        c = num_a - num_b
    elif operation == "*":
        c = num_a * num_b
    elif operation == "/":
        c = num_a / num_b
    elif operation == "%":
        c = num_a % num_b
    elif operation == "**":
        c = num_a ** num_b
    elif operation == "//":
        c = num_a // num_b
    else: 
        c = "Invalid operation"

    # print("Result:", c)
    print(f"Result: {c:.2f}")  # Format the result to 2 decimal places

except ValueError:
    print("Invalid input. Please enter integer values for a and b.")
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")
except Exception as e:
    print(f"An error occurred: {e}")