import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([]);
    useEffect(() => {
        getGameTypes()
         .then((gameTypeArray) => {
             setGameTypes(gameTypeArray);
         });
     }, []);

   
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

    

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...currentGame};
        copy[domEvent.target.name] = domEvent.target.value;
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTitle">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        defaultValue={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameMaker">Published by: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        defaultValue={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="game-dropdown">
                    <label htmlFor="gameGameTypeId">Type of game:</label>
                    <select
                        defaultValue={currentGame.gameTypeId}
                        required
                        autoFocus
                        name="game_type"
                        type="text"
                        className="form-control"
                        onChange={changeGameState}
                    >
                        <option value="0">Select a game type</option>
                        {gameTypes.map((gameType) => (
                            <option value={gameType.id}>{gameType.label}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameNumberOfPlayers">How many players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        defaultValue={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameSkillLevel">Skill level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        defaultValue={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const newGame = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: currentGame.number_of_players,
                        skill_level: currentGame.skill_level,
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    createGame(newGame)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}