import React, { useEffect, useMemo, useState } from "react";

import { Flex, Text, Image } from "@chakra-ui/react";
import { LeaderboardEntry } from "../../types/LeaderboardEntry";
import { MagicSet } from "../../types/MagicSet";
import { HistoryEntry } from "../../types/HistoryEntry";
import { UpNext } from "../home/UpNext";
import logo from "../../assets/logo.png";

export const StreamIntro = React.memo(function StreamIntro({
    leaderboard,
    leaderboardMaxNum,
    schedule,
    history,
}: {
    leaderboard: LeaderboardEntry[];
    leaderboardMaxNum: number;
    schedule: MagicSet[];
    history: HistoryEntry[];
}) {
    const [countdown, setCountdown] = useState<string>();

    const leaderboardContent = useMemo(() => {
        // if (leaderboard.length === 0) {
        //     return null;
        // }

        const elements = leaderboard
            ? leaderboard.slice(0, leaderboardMaxNum).map((entry, index) => {
                  return (
                      <Text
                          fontSize="20"
                          fontFamily="Ink Free"
                          fontWeight="bold"
                          textShadow="black 1px 0 10px"
                          color="white"
                          key={index}
                      >{`${entry.name}: ${entry.score}`}</Text>
                  );
              })
            : null;

        return (
            <Flex
                style={{
                    flex: 1,
                    marginBottom: "-64px",
                    flexDirection: "column",
                    maxWidth: "300px",
                    textAlign: "left",
                }}
            >
                <Text
                    fontSize={32}
                    fontFamily="Ink Free"
                    fontWeight={"bold"}
                    textShadow="black 1px 0 10px"
                    color="white"
                >
                    Leaderboard
                </Text>
                {elements}
            </Flex>
        );
    }, [leaderboard, leaderboardMaxNum]);

    useEffect(() => {
        // Set the date we're counting down to
        // this will be a 5 minute timer
        const countDownDate = new Date().getTime() + 5 * 60 * 1000;

        // Update the count down every 1 second
        setInterval(function () {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // If the count down is finished, write some text
            if (distance < 0) {
                // Display the result in the element with id="demo"
                setCountdown(`STREAM STARTING SOON`);
            } else {
                // Display the result in the element with id="demo"
                setCountdown(`LIVE IN ${minutes}:${seconds}`);
            }
        }, 1000);
    }, []);

    return (
        <Flex
            style={{
                flex: 1,
                backgroundColor: "magenta",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "32px",
                height: "100vh",
            }}
        >
            <Text
                style={{
                    fontSize: 64,
                    fontFamily: "Ink Free",
                    fontWeight: "bold",
                    textShadow: "black 1px 0 10px",
                    color: "white",
                    alignSelf: "flex-end",
                }}
            >
                {countdown}
            </Text>
            <Image src={logo} />
            <Flex direction={"row"}>
                {leaderboardContent}
                <Flex
                    flexDirection="column"
                    marginBottom="-64px"
                    justifyContent="center"
                    alignItems="center"
                    minWidth="900px"
                >
                    <UpNext schedule={schedule} streamMode={true} />
                    <div
                        style={{
                            flex: 1,
                            marginBottom: "-64px",
                            flexDirection: "row",
                            fontSize: 64,
                            fontFamily: "Ink Free",
                            fontWeight: "bold",
                            textShadow: "black 1px 0 10px",
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        {new Date().toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </Flex>
            </Flex>
        </Flex>
    );
});
