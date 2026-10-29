# Webshop Frontend

Frontend for a webshop application built with React, TypeScript and Vite. The application communicates with backend services through an API Gateway.

## Technologies

- React 19
- TypeScript
- Vite
- React Router
- Vitest
- React Testing Library
- Mock Service Worker (MSW)
- Oxlint

## Requirements

To run the project locally, you need:

- Node.js
- npm

## Getting Started

### 1. Clone the repository

Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/Stefanvill/agil-frontend.git
cd agil-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root for local development.

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_PRODUCT_SERVICE_URL=http://localhost:8081
VITE_API_ORDER_SERVICE_URL=http://localhost:9000
VITE_API_GATEWAY_URL=http://localhost:9003/gateway
```

The frontend uses `VITE_API_GATEWAY_URL` in `src/apiConfig.ts` to configure the API Gateway URL.

For production, the `.env.production` file contains:

```env
VITE_API_GATEWAY_URL=https://gateway.stenhager.com/gateway
```

Vite exposes environment variables prefixed with `VITE_` to frontend code. These variables must not contain secrets or private credentials.


### 4. Start the development server

```bash
npm run dev
```

Vite starts the development server and displays the local URL in the terminal.

## Available Scripts

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Starts the development server.                    |
| `npm run build`   | Checks TypeScript and creates a production build. |
| `npm run lint`    | Runs Oxlint.                                      |
| `npm run test`    | Runs Vitest tests.                                |
| `npm run preview` | Previews the production build locally.            |

## Testing

The project uses Vitest and React Testing Library for frontend tests.

The Vitest configuration uses the `jsdom` environment and the setup file `src/test/setup.ts`.

Run the tests with:

```bash
npm run test
```

## Production Build

Create a production build with:

```bash
npm run build
```

The generated build is placed in the `dist` directory.

To preview the build locally, run:

```bash
npm run preview
```

## Related Repositories

The frontend is part of a webshop project consisting of several backend services.

- [Auth Service](https://github.com/conniponni/Auth-server)
- [Product Service](https://github.com/philipwmitilinos-max/Product_Service)
- [Order Service](https://github.com/sedina-imamovic/order-service-webshop)
- [Gateway](https://github.com/conniponni/webshop-gateway)
- [Email Service](https://github.com/Stefanvill/email-service)
