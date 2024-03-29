import axios from "axios"
import { TourneyInfo } from "./types"

const BASE_URL = "http://localhost:3002/tourneyInfos"

export const getTourneyInfos = () => {
    return axios.get<TourneyInfo[]>(BASE_URL)
}
