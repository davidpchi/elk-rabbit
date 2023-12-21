import { useEffect, useState } from "react";
import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import "./App.css";
import { DataService } from "./services/DataService";
import { LeaderboardEntry } from "./types/LeaderboardEntry";
import { StreamIntro } from "./components/tools/StreamIntro";
import Snowfall from "react-snowfall";

const calendarLogo =
    "https://media.discordapp.net/attachments/787466774412787753/1180377698107932732/2022_advent_calendar_logo_copy.png";

const googleFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSfrE6W0BaAw0wWKa39Y-CgMZEru7XiAm7sE89PMcPrvvn5yyA/viewform";

function App() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>();
    const [cardSetImages, setCardSetImages] = useState<string[]>();

    useEffect(() => {
        const getLeaderboardCallback = (leaderboard: LeaderboardEntry[]) => {
            setLeaderboard(leaderboard);
        };

        DataService.getLeaderboard(getLeaderboardCallback);
    }, [setLeaderboard]);

    useEffect(() => {
        const getCardSetImagesCallback = (images: string[]) => {
            setCardSetImages(images);
        };

        DataService.getSetImages(getCardSetImagesCallback);
    }, [setCardSetImages]);

    const elements = leaderboard
        ? leaderboard.map((entry, index) => {
              return (
                  <Text fontSize={20} key={index}>
                      {`${entry.name}: ${entry.score}`}
                  </Text>
              );
          })
        : null;

    if (leaderboard === undefined || cardSetImages === undefined) {
        return null;
    }

    const queryParameters = new URLSearchParams(window.location.search);
    const path = queryParameters.get("path");

    if (path === "obs_intro") {
        return (
            <Flex position={"absolute"} top={0} left={0} right={0} bottom={0}>
                <StreamIntro
                    leaderboard={leaderboard}
                    leaderboardMaxNum={5}
                    cardSetImages={cardSetImages}
                />
            </Flex>
        );
    }

    const dayInDecember = new Date().getDate();
    const imageUri = cardSetImages[dayInDecember - 1];

    const navigateToForm = () => {
        window.location.href = googleFormLink;
    };

    return (
        <Flex backgroundColor={"rgb(255,255,255,0.8)"} position={"relative"}>
            <Snowfall />
            <Flex direction={"column"} alignItems={"center"}>
                <Flex maxWidth={1000}>
                    <Image maxWidth={"100%"} src={calendarLogo} />
                </Flex>
                <Heading>COMING UP NEXT: </Heading>
                <Flex
                    maxWidth={500}
                    backgroundColor={"rgb(0,0,0,0.8)"}
                    padding={16}
                    borderRadius={20}
                    direction={"column"}
                >
                    <Image maxWidth={"100%"} src={imageUri} objectFit={"contain"} />
                    <Button onClick={navigateToForm}>PICK YOUR GUESSES</Button>
                </Flex>
                <Flex direction={"column"}>
                    <Heading>LEADERBOARD</Heading>
                    {elements}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default App;
