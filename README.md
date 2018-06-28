# Chollima

Chollima is a web-based competition manager for speed skating. It is in early pre-alpha and does not work yet. 

## Contributions
Contributions are welcome, if you're submitting a pull request, please submit an issue with it.

## Running
To run Chollima , run `npm run start` on your commandline. The API server should also be running. Check `proxy.config.json` to ensure it is setup correctly.

## Problems
Store the salt of the recovery key in the database, instead of teh actual key

Recovery does not check expiry date of recoveryexpire
