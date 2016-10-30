# foolscode-service
The device will need to read a 'key' which contains the following information:
- Encryption key
- Unix time the key was generated

This will be passed using a QR code from the web app to the device.
The key is formatted as {key}{unixtime} with a key size of 32 bits

We need to return a time-based OTP with the following information as the source:
- Blood alcohol level (first 10 bits)
- Amount of seconds passed since the key was generated (last 22 bits)

This produces a 32 bit value which then has to be encrypted (probably using Skip32).

That value is then formatted into a HEX string and displayed on an LCD.

The user will then enter that string into the web interface and it will be verified with the following process:
- User encryption key is retrieved
- 32 bit value is decrypted
- First 10 bits parsed as the blood alcohol level
- Last 22 bits parsed as the amount of seconds passed
- Checks that (Datetime now) - (key creation time + amount of seconds passed) < 10 minutes
- Checks user BAL against a specified table to determine if user is drunk enough


# TEST - Drunk enough
01011111110000000000000000000000 = 1606418432

First ten bits = 0101111111 = 383, which is drunk enough

1606418432 encrypted with key 'qwertyuiop' is 2888317427
( skip32 qwertyuiop 1606418432 1)

2888317427 in HEX is AC2839F3

Passing AC2839F3 to /api/auth/decrypt returns 200 and 383 - drunk enough!


# TEST - Too Sober
11000001110000000000000000000000 = 3250585600

First ten bits = 1100000111 = 775, which is TOO SOBER!

3250585600 encrypted with key 'qwertyuiop' is 2601090635
( skip32 qwertyuiop 3250585600 1)

2601090635 in HEX is 9B097E4B

Passing 9B097E4B to /api/auth/decrypt returns 401 and 775 - too sober!
