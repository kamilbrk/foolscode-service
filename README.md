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
