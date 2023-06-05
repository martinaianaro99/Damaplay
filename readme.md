## DamaPlay

**Damaplay** is an appchain built on blockchain framework Tendermint using Cosmos SDK. The app implements the logic of checkers game integrating the GUI. The rules of classic dama play are enriched with basic functions as create game, make a move, record the winner and other more advanced functionalities (wager, game deadline, etc.). The game can be played from an external GUI exploiting Cosmos SDK modules as bank modul to manage the wager.
## Tools

The code is implemented using Ingite CLI v0.22.1 on OS Linux. The application is runned into a docker container using Docker v23.0.6. The docker images is built with the following configuration:

FROM --platform=linux ubuntu:22.04 as base ARG BUILDARCH ENV GO_VERSION=1.20.4 ENV IGNITE_VERSION=0.22.1 ENV NODE_VERSION=16.x ENV MOCKGEN_VERSION=1.6.0 ENV PROTOC_VERSION=21.7
## Intalling

1. Git clone the github repo
2. Create the Docker image
```
$ sudo docker build -f Dockerfile-ubuntu . -t checkers_i
```

3. Build the Docker container
```
$ sudo docker create --name checkers -i -v $(pwd):/checkers -w /checkers -p 1317:1317 -p 3000:3000 -p 4500:4500 -p 5000:5000 -p 26657:26657 checkers_i
```

4. Start docker container 
```
$ sudo docker start checkers
```

5. Launch the chain
```
$ sudo docker exec -it checkers ignite chain serve 
```

6. Add --reset-once to reset the chain and launch it
```
$ sudo docker exec -it checkers ignite chain serve --reset-once
```

7. Enter the bash in a new tab
```
$ sudo docker exec -it checkers bash
```

8. Add (default) environment variables
```
$ export REST_URL=http://0.0.0.0:1317 
$ export RPC_URL=http://0.0.0.0:26657
```

9. Launch the frontend
```
$ cd client 
$ npm start
```

10. Open browser to "http://localhost:3000"

11. Add in file .bashrc the 2 lines to set default alice and bob accounts
```
$ export alice="$(sudo docker exec checkers checkersd keys show alice -a)"
$ export bob="$(sudo docker exec checkers checkersd keys show bob -a)"
```

## Match with Alice (red) and Bob (black)

1. To check player credit (of Alice)
```
docker exec -it checkers checkersd query bank balances $alice balances: -amount: "100000000" denom: stake -amount: "20000" denom: token pagination: next_key: null total: "0"
```

2. creates the match as Alice with a wager of 1 token.
```
docker exec -it checkers checkersd tx checkers create-game $alice $bob 1 token --from $alice
```

3. see the board with command in terminal givig the positions of red and black pawns on it.
```
docker exec -it checkers bash -c "checkersd query checkers show-stored-game 1 --output json | jq ".storedGame.board" | sed 's/"//g' | sed 's/|/\n/g'"
```

 4. see the board on http://localhost:3000/menu and click "Resume Game" button of the desired game.
 To see the list of actived mathces
```
docker exec -it checkers checkersd query checkers list-stored-game 
```

5. to see the details of certain match.
```
docker exec -it checkers checkersd query checkers show-stored-game 1
```

6. to make a move as Alice (the red player must do first move) defining the id of game, the starting position (x,y) and the ending position (xi, yi).
```
docker exec -it checkers checkersd tx checkers play-move 1 1 2 2 3 --from $alice
```

7. the new position of pawn is visible in terminal with command (3) or from http://localhost:3000/play/1
    
8. to see the block of move tx where height number is taken from height field in teminal output of tx command (in this case command 7).
```
curl localhost:26657/block?height=1118
```

9. to visualize the winner of the match. The winner is who wins the game or ,in case of player forait, the other player after the expiring date (24h after last move).
```
docker exec -it checkers bash -c "checkersd query checkers show-stored-game 1 --output json | jq '.storedGame.winner'"
```

## Match yourself by GUI

 1. Install addon Kepler in browser and register on it.
 2. Copy cosmos address.
 3. Add stakes running this command. Each time adds 100 000 stakes.
```
curl --request POST --header "Content-Type: application/json" --data '{"address":"cosmos_address","denom":"stake"}' localhost:4500
```

4. To check an address credit.
```
docker exec -it checkers checkersd query bank balances cosmos_address
```

## Learn more

- [Ignite CLI](https://ignite.com/cli)
- [Tutorials](https://docs.ignite.com/guide)
- [Ignite CLI docs](https://docs.ignite.com)
- [Cosmos SDK docs](https://docs.cosmos.network)
- [Developer Chat](https://discord.gg/ignite)
