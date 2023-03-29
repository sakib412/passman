# Run this project locally

## Pre-requisites

- Node.js (tested on v18.15.0)
- Run server locally before running client [https://github.com/sakib412/passman-api](https://github.com/sakib412/passman-api)



### Clone this repo and install the dependencies:
    
    ```bash
    git clone https://github.com/sakib412/passman.git
    cd passman
    npm install
    ```

### Copy .env.example to .env

    ```bash
    cp .env.example .env
    ```

### Start the development server:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

N.B Port number can be different if 3000 is already in use. Check the terminal for the correct port number. 

### For production build:

    ```bash
    npm run build
    npm run start
    ```
