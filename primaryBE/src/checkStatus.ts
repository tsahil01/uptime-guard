import { healthCheckerRoute } from "./types";
import axios from "axios";

export async function checkStatus({ url }: { url: string }) {
    // console.log(healthCheckerRoute + '/health/single');
    const response = await axios.post(healthCheckerRoute + '/health/single', { url });
    // console.log("response", response.data);

    return response.data
}

export async function statusHistory({ url }: { url: string }) {
    const response = await axios.get(healthCheckerRoute + '/health/history', { params: { url } });
    return response.data

}