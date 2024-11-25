import axios from "axios";
import { LeaderboardEntry } from "../types/LeaderboardEntry";
import { MagicSet } from "../types/MagicSet";
import { HistoryEntry } from "../types/HistoryEntry";

const leaderboardEndpoint: string =
    "https://docs.google.com/spreadsheets/d/12YdGWLy6b9TOXSsgKohkL4KHbphSybJjCD6HVgdALrw/gviz/tq?gid=1015077658";

const imagesEndpoint: string =
    "https://docs.google.com/spreadsheets/d/12YdGWLy6b9TOXSsgKohkL4KHbphSybJjCD6HVgdALrw/gviz/tq?gid=1449453517";

const winnerHistoryEndpoint: string =
    "https://docs.google.com/spreadsheets/d/12YdGWLy6b9TOXSsgKohkL4KHbphSybJjCD6HVgdALrw/gviz/tq?gid=1177267993";

const getLeaderboard = async (callback: (result: LeaderboardEntry[]) => void) => {
    axios.get<string>(leaderboardEndpoint, {}).then((res) => {
        let raw: string = res.data;
        const startText = ".setResponse(";
        raw = raw.substring(raw.indexOf(startText) + startText.length);
        raw = raw.substring(0, raw.length - 2);
        const obj = JSON.parse(raw);

        const players = [];

        // create the collection of players
        for (let i = 0; i < obj.table.rows.length; i++) {
            const row = obj.table.rows[i];
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

const getSetData = async (callback: (result: MagicSet[]) => void) => {
    axios.get<string>(imagesEndpoint, {}).then((res) => {
        let raw: string = res.data;
        const startText = ".setResponse(";
        raw = raw.substring(raw.indexOf(startText) + startText.length);
        raw = raw.substring(0, raw.length - 2);
        const obj = JSON.parse(raw);

        const sets: MagicSet[] = [];

        // create the collection of players
        for (let i = 0; i < obj.table.rows.length; i++) {
            const row = obj.table.rows[i];
            sets.push({
                name: row.c[0].v,
                imageUri: row.c[1]?.v ?? "",
                id: row.c[2].v,
                isComplete: row.c[5].v ?? false,
            });
        }

        callback(sets);
    });
};

const getHistory = async (callback: (result: HistoryEntry[]) => void) => {
    axios.get<string>(winnerHistoryEndpoint, {}).then((res) => {
        let raw: string = res.data;
        const startText = ".setResponse(";
        raw = raw.substring(raw.indexOf(startText) + startText.length);
        raw = raw.substring(0, raw.length - 2);
        const obj = JSON.parse(raw);

        const history: HistoryEntry[] = [];

        // create the collection of players
        for (let i = 0; i < obj.table.rows.length; i++) {
            const row = obj.table.rows[i];

            const result: HistoryEntry = {
                winningCards: [],
                winningPlayers: [],
                tiebreakerWinner: undefined,
            };

            // create the collection of winning scryfall ids
            if (row.c[0]) {
                result.winningCards = row.c[0].v.split(",");
            }

            if (row.c[1]) {
                result.winningPlayers = row.c[1].v.split(",");
            }

            if (row.c[2]) {
                result.tiebreakerWinner = row.c[2].v;
            }

            history.push(result);
        }

        callback(history);
    });
};

export const DataService = {
    getLeaderboard,
    getSetData,
    getHistory,
};
