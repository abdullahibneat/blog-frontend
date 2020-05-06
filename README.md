During development, run server from https://github.com/abdullahibneat/blog-backend

In production, set `REACT_APP_BASE_URL` environment variable to the production backend address *without the ending forward slash* (e.g. REACT_APP_BASE_URL="https://blog-backend.abdullahibneat.now.sh")

For vercel:
`now secrets add blog-frontend-api-url https://blog-backend.abdullahibneat.now.sh`

Frontent from: https://github.com/fullstack-hy2020/bloglist-frontend