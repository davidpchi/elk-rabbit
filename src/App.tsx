import { useEffect, useState } from "react";
import { Button, Flex, Heading, Image } from "@chakra-ui/react";

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

const googleFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSfrE6W0BaAw0wWKa39Y-CgMZEru7XiAm7sE89PMcPrvvn5yyA/viewform";

function App() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>();
    const [history, setHistory] = useState<HistoryEntry[]>();
    const [cardSetImages, setCardSetImages] = useState<MagicSet[]>();

    useEffect(() => {
        const getLeaderboardCallback = (leaderboard: LeaderboardEntry[]) => {
            setLeaderboard(leaderboard);
        };

        DataService.getLeaderboard(getLeaderboardCallback);
    }, [setLeaderboard]);

    useEffect(() => {
        const getCardSetImagesCallback = (sets: MagicSet[]) => {
            setCardSetImages(sets);
        };

        DataService.getSetData(getCardSetImagesCallback);
    }, [setCardSetImages]);

    useEffect(() => {
        const getHistoryCallback = (history: HistoryEntry[]) => {
            setHistory(history);
        };

        DataService.getHistory(getHistoryCallback);
    }, [setHistory]);

    if (leaderboard === undefined || cardSetImages === undefined) {
        return null;
    }

    // /elk-rabbit/elk-rabbit?path=obs_intro
    const queryParameters = new URLSearchParams(window.location.search);
    const path = queryParameters.get("path");

    if (path === "obs_intro") {
        return (
            <Flex position={"absolute"} top={0} left={0} right={0} bottom={0}>
                <StreamIntro leaderboard={leaderboard} leaderboardMaxNum={5} cardSetImages={[]} />
            </Flex>
        );
    }

    let dayInDecember = new Date().getDate();

    // if we are past the 24th day, we can just show the first item.
    if (dayInDecember > 24) {
        dayInDecember = 0;
    }

    const imageUri = cardSetImages[dayInDecember].imageUri;
    const result =
        history !== undefined && dayInDecember >= 3 ? history[dayInDecember - 1] : undefined;

    const navigateToForm = () => {
        window.location.href = googleFormLink;
    };

    return (
        <Flex backgroundColor={"rgb(255,255,255,0.8)"} position={"relative"}>
            <Snowfall />
            <Flex direction={"column"} alignItems={"center"}>
                <Flex maxWidth={1000}>
                    <Image maxWidth={"100%"} src={logo} />
                </Flex>
                <Heading>COMING UP NEXT: </Heading>
                <Flex
                    maxWidth={500}
                    backgroundColor={"rgb(0,0,0,0.8)"}
                    padding={16}
                    borderRadius={20}
                    direction={"column"}
                >
                    <Image
                        maxWidth={"100%"}
                        src={imageUri}
                        objectFit={"contain"}
                        marginBottom={"16px"}
                    />
                    <Button onClick={navigateToForm}>PICK YOUR GUESSES</Button>
                </Flex>
                <Flex direction={"column"}>
                    {result ? <Heading>YESTERDAY'S RESULTS</Heading> : null}
                    <PreviousResult result={result} />
                </Flex>
                <Flex direction={"column"}>
                    <Heading>LEADERBOARD</Heading>
                    <Leaderboard leaderboard={leaderboard} />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default App;
