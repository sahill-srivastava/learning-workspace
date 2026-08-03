# Devtinger API

auth.js
- POST /signup
- POST /login
- POST /logout


profile.js
- GET /profile
- PATCH /profile/edit
- PATCH /profile/password


connectionRequest.js
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profile of other users


Status: ignore, interested, accepted, rejected

