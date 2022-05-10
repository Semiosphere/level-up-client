import React, { useState, useEffect } from "react"
import { updateEvent, getEventById } from "./EventManager"
import { useParams, useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager"

export const EventUpdate = () => {
    const { eventId } = useParams()
    const history = useHistory()

    const handleControlledInputChange = (domEvent) => {
        const copy = { ...event };
        copy[domEvent.target.name] = domEvent.target.value;
        setEvent(copy)
    }

    useEffect(() => {
        getEventById(eventId).then((res) => {
            setEvent(res)
        })
    }, [])


    const [event, setEvent] = useState({})
    updateEvent({
        id: event.id,
        game: event.game,
        description: event.description,
        date: event.date,
        time: event.time
    })


    const [games, setGames] = useState([]);
    useEffect(() => {
        getGames()
            .then((gameArray) => {
                setGames(gameArray);
            });
    }, []);

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Create New Event</h2>

            <fieldset>
                <div className="game-dropdown">
                    <label htmlFor="gameTitle">Game:</label>
                    <select
                        defaultValue={event.game}
                        required
                        autoFocus
                        name="game"
                        type="text"
                        className="form-control"
                        onChange={handleControlledInputChange}
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
                        defaultValue={event.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventDate">Event Date : </label>
                    <input type="date" name="date" required className="form-control"
                        placeholder="When is your event?"
                        defaultValue={event.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventTime">Event Time : </label>
                    <input type="time" name="time" required className="form-control"
                        placeholder="What time is your event?"
                        defaultValue={event.time}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={domEvent => {
                    // Prevent form from being submitted
                    domEvent.preventDefault()
                    const editedEvent = {
                        id: event.id,
                        game: event.game,
                        description: event.description,
                        date: event.date,
                        time: event.time
                    }

                    updateEvent(editedEvent)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
