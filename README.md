# pokedex-shoval-oshrit

## About the project
This project is pokedex website that rendering a lot of types of Pokemons and their attributes (id, name, image , abilities, types, weight and height ).
This project was written by two of us in full of cooperation.

- On the Client part we separated the features and each one wrote the functions that she was responsible for -
Oshrit was responsible for the design and pop-up of a single Pokemon.
Shoval was responsible for the pagination and the favorite list.

- On the server side, we worked together and wrote the code in full cooperation, 
so that we gained knowledge from each other on how to write the server from scratch.

## Technological part
We brought our Pokemons list using the API and we wrote a script that runs once and places all the objects in a convenient way for rendering to the client's computer.
In addition, as part of the task, the script included a code that performed a "union" between different Pokemon (
  There was a part in the script that made sure that no pokemon was repeated) so we ended up with 8,100 pokemons.
At first We stored all the Pokemons data in MongoDB as an objects,and then we learn SQL Database and decided to use PostgreSQL.
We passed all the data to PostgreSQL and changed our queries in accordance to the corrent database.


We chose TypeScript for both sides because we wanted to work with a gulp file and practice the material we learned practically.
We compiled the client side and the server side with the gulp file into separate folders using the env file to take information from our Database.

This is our [link](https://pokedex-shoval.herokuapp.com/) to website:
