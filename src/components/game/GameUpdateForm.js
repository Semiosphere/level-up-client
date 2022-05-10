import React, { useState, useEffect } from "react"
import { updateGame, getGameById, getGameTypes } from "./GameManager"
import { useParams, useHistory } from 'react-router-dom'


export const GameUpdate = () => {
    const { gameId } = useParams()
    const history = useHistory()

    const changeGameState = (domEvent) => {
        const copy = { ...game };
        copy[domEvent.target.name] = domEvent.target.value;
        setGame(copy)
    }

    useEffect(() => {
        getGameById(gameId).then((res) => {
            setGame(res)
        })
    }, [])


    const [game, setGame] = useState({})
    updateGame({
        id: game.id,
        skill_level: game.skill_level,
        number_of_players: game.number_of_players,
        title: game.title,
        maker: game.maker,
        game_type: game.game_type
    })

    const [gameTypes, setGameTypes] = useState([]);
    useEffect(() => {
        getGameTypes()
            .then((gameTypeArray) => {
                setGameTypes(gameTypeArray);
            });
    }, []);


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTitle">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        defaultValue={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameMaker">Published by: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        defaultValue={game.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="game-dropdown">
                    <label htmlFor="gameGameTypeId">Type of game:</label>
                    <select
                        defaultValue={game.gameTypeId}
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
                        defaultValue={game.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameSkillLevel">Skill level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        defaultValue={game.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={domEvent => {
                    // Prevent form from being submitted
                    domEvent.preventDefault()

                    const editedGame = {
                        id: game.id,
                        maker: game.maker,
                        title: game.title,
                        number_of_players: game.number_of_players,
                        skill_level: game.skill_level,
                        game_type: game.game_type
                    }

                    // Send POST request to your API
                    updateGame(editedGame)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}