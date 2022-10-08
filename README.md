# pokedex-shoval-oshrit

This is our [link](https://pokedex-shoval.herokuapp.com/) to the website, click and enjoy :stuck_out_tongue_winking_eye:

## About the project
This project is pokedex website that rendering a lot of types of Pokémons and their attributes (id, name, image , abilities, types, weight and height ).
I wrote it with a team member in full cooperation :dancers: .

- On the Client part we separated the features and each one wrote the functions that she was responsible for -
Oshrit was responsible for the design and pop-up of a single Pokemon.
I was responsible for the pagination and the favorite list.

- On the server side, we worked together and wrote the code in full cooperation, 
so that we gained knowledge from each other on how to write the server from scratch.

## Technological part
We brought our Pokémons list using the API and we wrote a script that runs once and places all the objects in a convenient way for rendering to the client's UI. In addition, as part of the task, the script included a code that performed a "union" between different Pokémon’s (there was a part in the script that made sure that no Pokémon was repeated) so we ended up with 8,100 Pokémons. At first, we stored all the Pokémon’s data in MongoDB as an objects, and then we learned SQL Database and decided to use PostgreSQL. We passed all the data to PostgreSQL and changed our queries in accordance with the current database.

We chose TypeScript for both sides because we wanted to work with a gulp file and practice the material we learned. We compiled both the client and server side with the gulp file into separate folders, and we stored our password to the Database in the env file.



## How to :runner: the project?
- git clone
- npm ci
- npm run deploy
- node deploy/server/server.js
