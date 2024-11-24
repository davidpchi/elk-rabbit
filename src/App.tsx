import { useEffect, useState } from "react";
import { Flex, Heading, Image } from "@chakra-ui/react";

import "./App.css";
import { DataService } from "./services/DataService";
import { LeaderboardEntry } from "./types/LeaderboardEntry";
import { StreamIntro } from "./components/tools/StreamIntro";
import Snowfall from "react-snowfall";
import { MagicSet } from "./types/MagicSet";
import { HistoryEntry } from "./types/HistoryEntry";
import { Leaderboard } from "./components/home/Leaderboard";
import { PreviousResult } from "./components/home/PreviousResult";
import logo from "./assets/logo.png";
import { UpNext } from "./components/home/UpNext";

function App() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>();
    const [history, setHistory] = useState<HistoryEntry[]>();
    const [schedule, setSchedule] = useState<MagicSet[]>();

    useEffect(() => {
        const getLeaderboardCallback = (leaderboard: LeaderboardEntry[]) => {
            console.log(leaderboard);

            setLeaderboard(leaderboard);
        };

        DataService.getLeaderboard(getLeaderboardCallback);
    }, [setLeaderboard]);

    useEffect(() => {
        const getCardSetImagesCallback = (schedule: MagicSet[]) => {
            setSchedule(schedule);
        };

        DataService.getSetData(getCardSetImagesCallback);
    }, [setSchedule]);

    useEffect(() => {
        const getHistoryCallback = (history: HistoryEntry[]) => {
            setHistory(history);
        };

        DataService.getHistory(getHistoryCallback);
    }, [setHistory]);

    // /elk-rabbit/elk-rabbit?path=obs_intro
    const queryParameters = new URLSearchParams(window.location.search);
    const path = queryParameters.get("path");

    if (path === "obs_intro") {
        return (
            <Flex position={"absolute"} top={0} left={0} right={0} bottom={0}>
                <StreamIntro
                    leaderboard={leaderboard ?? []}
                    leaderboardMaxNum={5}
                    schedule={schedule ?? []}
                />
            </Flex>
        );
    }

    return (
        <Flex backgroundColor={"rgb(255,255,255,0.8)"} position={"relative"}>
            <Snowfall />
            <Flex direction={"column"} alignItems={"center"}>
                <Flex maxWidth={1000}>
                    <Image maxWidth={"100%"} src={logo} />
                </Flex>
                <UpNext schedule={schedule} />
                <Flex direction={"column"}>
                    <PreviousResult history={history} />
                </Flex>
                <Flex direction={"column"}>
                    <Heading>LEADERBOARD</Heading>
                    <Leaderboard leaderboard={leaderboard ?? []} />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default App;
