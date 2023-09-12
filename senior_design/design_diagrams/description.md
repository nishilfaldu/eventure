# Design Diagrams - Explanation

## D0

-   Client: Users of the event management app.
-   Internet: The network connecting clients to the server.
-   Reverse Proxy: Enhances security and balances incoming traffic.
-   Front-end: User interface for client interactions.
-   Backend: Server-side logic, data processing, and database interaction.
-   Database: Stores event, user, and registration data.

Clients access the app through the internet. A reverse proxy enhances security and balances traffic. The front-end provides the user interface, while the backend handles logic and communicates with the database for data storage and retrieval. This architecture ensures a responsive event management system.

## D1

-   Client: Users input username and password for authentication.
-   Authentication System: Verifies user credentials.
-   Load Balancer: Distributes incoming traffic.
-   Reverse Proxy: Manages security and forwards data.
-   Front-end: Provides the user interface.
-   Images CDN: Stores and serves images for the front-end.
-   Backend: Handles various services and communicates with the database.
-   Database: Stores event, checklist, chat, and user data.

Users log in via the client, which sends credentials to the authentication system. A load balancer distributes traffic, and a reverse proxy manages security. The front-end offers the user interface and connects to an images CDN for image storage. The backend hosts services like event creation, checklist curation, and chat, all interacting with the database for data retrieval and storage. This architecture ensures efficient handling of user interactions and data management.

## D2

-   Clerk.dev: Serves as the authentication system for user credentials.
-   Load Balancer (AWS): Manages incoming traffic and ensures high availability.
-   Reverse Proxy (NGINX): Handles security and forwards requests.
-   Next.js Frontend: Provides the user interface and client-side rendering.
-   Backend (Keystone): Includes Prisma and a GraphQL layer for data management.
-   Prisma Layer: Interacts with the database for efficient data operations.
-   Database: Stores various data, including events, checklists, and chat.
-   Images CDN: Stores and serves images to enhance frontend performance.

Users log in through Clerk.dev, and AWS load balancer ensures traffic distribution and reliability. NGINX reverse proxy enhances security. Next.js powers the frontend with a dynamic user interface. Keystone backend, along with Prisma and GraphQL, manages data and communicates with the database. The database stores event-related information, checklists, and chat data. Additionally, an images CDN optimizes image delivery for improved frontend performance. This architecture enables secure, efficient, and responsive event management.
