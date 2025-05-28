import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import Authpage from "../pages/Authpage"
export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: Authpage,
  })