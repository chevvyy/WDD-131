#num1=input("Enter first number: ")
#num2=input("Enter second number: ")
#mod = int(num1) % int(num2)
#div = int(num1) // int(num2)
#print("The modulus of", num1, "and", num2, "is:", mod)
#print("The division of", num1, "and", num2, "is:", div)

#RSA Key Generation
# p=input("Enter first prime number: ")
# q=input("Enter second prime number: ")
# n = int(p) * int(q)
# phi = (int(p) - 1) * (int(q) - 1)
# e=int(input("Enter a number e such that 1 < e < phi and gcd(e, phi) = 1: "))

# def euclid(x, y):
#     """
#     Implements the euclid algorithm to find the GCD
#     of x and y in linear combination form. This
#     function returns a tuple (gcd, s, t) where
#     gcd = s*x + t*y.
#     """
#     if x == 0:
#         return (y, 0, 1)
#     (gcd, s, t) = euclid(y % x, x)
#     return (gcd, t - (y // x) * s, s)

# euclid_result = euclid(e, phi)
# gcd, s, t = euclid(e, phi)
# print("GCD of", e, "and", phi, "is:", gcd)

# if gcd != 1:
#     print("e is not coprime to phi. Pick a different e.")
# else:
#     d = s % phi
#     print("Public key:  (", e, ",", n, ")")
#     print("Private key: (", d, ",", n, ")")
# encrypted_message = int(input("Enter a message to encrypt (as an integer): "))
# ciphertext = pow(encrypted_message, e, n)
# print("Encrypted message:", ciphertext)
# decrypted_message=input("Enter the ciphertext to decrypt (as an integer): ")
# decrypted_message = pow(int(decrypted_message), d, n)
# print("Decrypted message:", decrypted_message)



# Factorial and Permutation

from math import factorial


def C(n, r):
    return factorial(n) // (factorial(r) * factorial(n - r))
def permutation(n, r):
    return factorial(n) // factorial(n - r)
print("Permutation is:", permutation(int(input("Enter n: ")), int(input("Enter r: "))))
print("Combination is:", C(int(input("Enter n: ")), int(input("Enter r: "))))