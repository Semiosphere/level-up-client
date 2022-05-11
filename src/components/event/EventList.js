import React, { useState, useEffect } from "react"
import { getEvents, deleteEvent, leaveEvent, joinEvent } from "./EventManager.js"
import { useHistory } from 'react-router-dom'

export const EventList = (props) => {
    const history = useHistory()
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">

            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Create New Event</button>

            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        {
                            event.joined ?
                            <button onClick={() => leaveEvent(event.id).then(setEvents)} >Leave this event</button>
                            :
                            <button onClick={() => joinEvent(event.id).then(setEvents)} >Join this event</button>
                        }
                        <div className="event__game__title">{event.game.title} organized by {event.organizer.id}</div>
                        <div className="event__date">{event.date} at {event.time}</div>
                        <div className="event__description">{event.description}</div>
                        <button className="edit-event-btn"
                                onClick={() => {
                                history.push({ pathname: `/events/edit/${event.id}` })
                            }}
                        >Edit Event</button>
                        <button onClick={() => deleteEvent(event.id).then(setEvents)} >Delete</button>
                            
                    </section>
                    
                })
            }
        </article>
    )
}