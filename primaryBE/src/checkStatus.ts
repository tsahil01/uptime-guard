import { healthCheckerRoute } from "./types";
import axios from "axios";

export async function checkStatus({ url }: { url: string }) {
    console.log(healthCheckerRoute + '/health/single');
    const response = await axios.post(healthCheckerRoute + '/health/single', { url });
    console.log("response", response.data);

    return response.data
}