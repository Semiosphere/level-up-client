import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { EventList } from "./event/EventList.js"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./event/EventForm.js"
import { GameUpdate } from "./game/GameUpdateForm.js"
import { EventUpdate } from "./event/EventUpdateForm.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route path="/games/edit/:gameId(\d+)">
                <GameUpdate />
            </Route>     
            <Route path="/events/edit/:eventId(\d+)">
                <EventUpdate />
            </Route>
        </main>
    </>
}