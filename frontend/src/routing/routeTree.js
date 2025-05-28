import { createRootRoute } from "@tanstack/react-router"
import { authRoute } from "./auth.route"
import { homepageRoute } from "./homepage.route"
import { dasboardRoute } from "./dashboard.route"
import App from "../App"
export const rootRoute = createRootRoute({
    component: App
})

export const routeTree =rootRoute.addChildren([
    authRoute, 
    homepageRoute,
    dasboardRoute
])
