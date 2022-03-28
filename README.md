# :fork_and_knife:Dinder

Dinder, the app where Tinder and Dinner come together! Dinder is a matching application where users can match with restaurants. Users can create an account, fill in their preferences and set filters.The app will show a list of restaurants that meet the user's wishes and the user can start swiping the cards left or right. All restaurants that the user swiped right will appear in the favorites list, where the user can find the contact information or place a reservation immediately.

## :sparkles:Features

|Features|
|:-------|
|Create an account|
|Login|
|Set filters for restaurants|
|Swipe left and right on cards|
|Save the liked cards in favorites list|
|Remove cards from favorites list|

## :rocket:Install and Run the project

To use Dinder, you will have to clone this repo. You can do this by typing the following command in your terminal:

```
git clone https://github.com/evaboogaard/blok-tech-team
```

The next step is to install the corresponding npm packages with the following command:

```
npm install
```

This project uses a MongoDB database. Unfortunately it is not possible to use our database, but it is quite easy to arrange this yourself. You can register for [MongoDB](https://www.mongodb.com/cloud/atlas/register) and then you can create a database there. Then you can create an .env file in your code editor and put the following line in it:

```
MONGO_URI=Link to your own database
```

You have now linked Dinder to your own database! All you have to do now is fill the database with restaurants.

The only thing left to do is run the application with the following command:

```
npm start
```

Congrats, you are all set now! Go to localhost:3000 in your browser and enjoy using Dinder!

## :busts_in_silhouette:Contribute

If you have any questions or suggestions, please contact us! You can do this by creating an [issue](https://github.com/evaboogaard/blok-tech-team/issues), and we'll answer you as fast as we can :)

## :memo:Documentation

For further documentation, see the [wiki](https://github.com/evaboogaard/blok-tech-team/wiki) of this repository

## :technologist:Authors

This project is designed and created by [Anneke Steller](https://github.com/annekesteller), [Daniël Vink](https://github.com/Davi9898), [Eva Boogaard](https://github.com/evaboogaard), [Max van Liempdt](https://github.com/maxvl3) and [Pip Harsveld](https://github.com/PipHarsveld).

## :page_facing_up:License

Copyright © 2022.<br>
This project is [MIT]() licensed.
