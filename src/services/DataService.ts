import axios from "axios";
import { LeaderboardEntry } from "../types/LeaderboardEntry";

const leaderboardEndpoint: string =
    "https://docs.google.com/spreadsheets/d/12YdGWLy6b9TOXSsgKohkL4KHbphSybJjCD6HVgdALrw/gviz/tq?gid=1015077658";

const imagesEndpoint: string =
    "https://docs.google.com/spreadsheets/d/12YdGWLy6b9TOXSsgKohkL4KHbphSybJjCD6HVgdALrw/gviz/tq?gid=1449453517";

const getLeaderboard = async (callback: (result: LeaderboardEntry[]) => void) => {
    axios.get<string>(leaderboardEndpoint, {}).then((res) => {
        let raw: string = res.data;
        const startText = ".setResponse(";
        raw = raw.substring(raw.indexOf(startText) + startText.length);
        raw = raw.substring(0, raw.length - 2);
        const obj = JSON.parse(raw);

        console.log(obj);

        const players = [];

        // create the collection of players
        for (const row of obj.table.rows) {
            players.push({
                name: row.c[0].v,
                wins: row.c[1].v,
            });
        }

        // sort the players from most wins to least
        const sorted = players.sort((a, b) => b.wins - a.wins);
        const results: LeaderboardEntry[] = [];
        for (let i = 0; i < sorted.length; i++) {
            results.push({
                name: sorted[i].name,
                score: Number(sorted[i].wins),
            });
        }

        callback(results);
    });
};

const getSetImages = async (callback: (result: string[]) => void) => {
    axios.get<string>(imagesEndpoint, {}).then((res) => {
        let raw: string = res.data;
        const startText = ".setResponse(";
        raw = raw.substring(raw.indexOf(startText) + startText.length);
        raw = raw.substring(0, raw.length - 2);
        const obj = JSON.parse(raw);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const images: string[] = (obj.table.rows as any[]).map((row: any) => row.c[1].v ?? "");

        callback(images);
    });
};

export const DataService = {
    getLeaderboard,
    getSetImages,
};
