import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager.js"
import { createEvent } from './EventManager.js'



export const EventForm = () => {
    const history = useHistory()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: 0
    })


    const [games, setGames] = useState([]);
    useEffect(() => {
       getGames()
        .then((gameArray) => {
            setGames(gameArray);
        });
    }, []);


    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        //create a copy of currentEvent
        //on the copy, modify the value of the key assc. with the change
        const copy = { ...currentEvent};
        copy[domEvent.target.name] = domEvent.target.value;
        setCurrentEvent(copy)

    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Create New Event</h2>

            <fieldset>
                <div className="game-dropdown">
                    <label htmlFor="gameTitle">Game:</label>
                    <select
                        defaultValue={currentEvent.game}
                        required
                        autoFocus
                        name="game"
                        type="text"
                        className="form-control"
                        onChange={changeEventState}
                    >
                        <option value="0">Select a game</option>
                        {games.map((game) => (
                            <option value={game.id}>{game.title}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

            
            <fieldset>
            <div className="form-group">
                <label htmlFor="eventDescription">Event Description : </label>
                <input type="text" name="description" required className="form-control"
                    placeholder="Briefly describe the event"
                    defaultValue={currentEvent.description}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="eventDate">Event Date : </label>
                <input type="date" name="date" required className="form-control"
                    placeholder="When is your event?"
                    defaultValue={currentEvent.date}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="eventTime">Event Time : </label>
                <input type="time" name="time" required className="form-control"
                    placeholder="What time is your event?"
                    defaultValue={currentEvent.time}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const newEvent = {
                        game: parseInt(currentEvent.game),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(newEvent)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}