# Login

- [ ] Add "loggedIn" state. Can be `true` or `false`.

## How will this state be determined?
After the "login" button is clicked, and the user info is succesfully sent to the server (with no errors), query for a `request.user`. If it exists, and the user data is successfully sent back (with no errors), update the state to true. If `request.user` does not exist, keep the login state as its default: `false`.

Although `currentUser` is already a query, it returns a `User` type. This isn't necessary, so maybe I'll just create a `isLoggedIn` query that simply returns a boolean. If `request.user` doesn't exist, it returns `false`. If it does, it returns `true`.
