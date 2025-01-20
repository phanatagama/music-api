
![music-api](https://socialify.git.ci/phanatagama/music-api/image?description=1&font=KoHo&forks=1&issues=1&language=1&pattern=Formal+Invitation&pulls=1&stargazers=1&theme=Auto)
# Music API v3

Welcome to the Music API v3 project! This API allows users to manage and retrieve information about music songs and albums.

## ⚡ Features

- Retrieve a list of music songs
- Get details of a specific songs
- Add new songs
- Update existing songs
- Delete songs
- Retrieve a list of albums
- Get details of a specific album
- Add new albums
- Update existing albums
- Delete albums
- Exports playlists
- Upload albums covers

## ⚙ Tech Stack
- [NodeJs](nodejs.org)
- [Hapi Framework](hapi.dev)
- [Swagger API](swagger.io)
- [PostgreSQL](postgresql.org)
- [RabbitMQ](rabbitmq.com)
- [Redis](redis.io)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/phanatagama/music-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd music-api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a postgreSQL database and copy the .env.local as your .env configuration:
    ```bash
    cp .env.local .env
    ```
5. Migrate postgre database
    ```bash
    npm run migrate up
    ```
## Usage

1. Start the server:
    ```bash
    pnpm start
    ```
2. The API will be available at `http://localhost:3000`.

## Endpoints
For more detail please check the docs at ```http://localhost:3000/documentation```
### Albums

- `GET /albums` - Retrieve a list of all albums
- `GET /albums/:id` - Retrieve details of a specific album
- `POST /albums` - Add a new album
- `PUT /albums/:id` - Update an existing album
- `DELETE /albums/:id` - Delete an album

### Songs

- `GET /songs` - Retrieve a list of all songs
- `GET /songs/:id` - Retrieve details of a specific artist
- `POST /songs` - Add a new artist
- `PUT /songs/:id` - Update an existing artist
- `DELETE /songs/:id` - Delete an artist

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [phanatagama@gmail.com](mailto:phanatagama@gmail.com).
