# Blog frontend

![Blogs page](https://i.imgur.com/XmDrxyO.jpg)

## Overview

This React application was built as part of the [FullStackOpen](https://fullstackopen.com/en/) online course, and it acts as the user interface for the [blog backend](https://github.com/abdullahibneat/blog-backend). 
The starting point for this project was taken from [https://github.com/fullstack-hy2020/bloglist-frontend](https://github.com/fullstack-hy2020/bloglist-frontend).
The UI has been built using [BluePrintJS](https://blueprintjs.com/).
It can be seen in action at the following address: [https://blog-frontend.abdullahibneat.now.sh/](https://blog-frontend.abdullahibneat.now.sh/)

## Running locally

During development, running the backend locally is not necessary. Instead, you can run `REACT_APP_BASE_URL=https://blog-backend.abdullahibneat.now.sh npm start` to start the application.

## Environment variables

During development there is no need to set any environment variable. Instead, run the server from [https://github.com/abdullahibneat/blog-backend](https://github.com/abdullahibneat/blog-backend)

|Name|Value|
|--|--|
|REACT_APP_BASE_URL|Address to the backend *without the ending forward slash* (e.g. REACT_APP_BASE_URL="https://blog-backend.abdullahibneat.now.sh"|

To deploy to vercel:
- `now secrets add blog-frontend-api-url https://blog-backend.abdullahibneat.now.sh`

## Technologies used
- React-router
- Redux (state management)
- Cypress (end-to-end testing)

## Running Cypress testing
1. Make sure you're running the backend locally, use `npm run test` and set the `MONGODB_TEST_URI` in the `.env` file
2. Run the frontend: `REACT_APP_BASE_URL=http://localhost:3002 npm start`
3. Finally, run the Cypress tests: `npm run cypress`

## Redux store

The Redux store is defined in `/src/store.js`. The following reducers are used:

|Reducer|Details|
|--|--|
|blogs|List of all blogs fetched from the backend|
|user|Details of the current user, loaded from the localStorage|
|notification|Sets a notification to be displayed to the user|

Additionally, the `redux-thunk` package is used to easily dispatch events to the store. The following methods are available:

|Name|Details|
|--|--|
|`createBlog(blog)`|Creates a new blog by adding it to the backend. `blog` is a JSON object as follows: `{ title: "blog title", author: "blog author", url: "/link/to/article" }`|
|`updateBlog(blog)`|Updates a field of the blog|
|`deleteBlog(blog)`|Permanently deletes a blog. This is only possible if the `user` in the Redux store matches the user of the blog|
|`setNotification(message, level = "NORMAL")`|Allows a notification to be displayed to the user. The optional level parameter can be used to change the appearance of the notification and can be set to either "SUCCESS" or "ERROR"|
|`logout()`|Allows the current user to logout|
