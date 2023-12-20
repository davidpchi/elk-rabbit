import React, { useEffect, useMemo, useState } from "react";

import { Flex, Text } from "@chakra-ui/react";
import { LeaderboardEntry } from "../../types/LeaderboardEntry";

export const StreamIntro = React.memo(function StreamIntro({
    leaderboard,
    leaderboardMaxNum,
    cardSetImages,
}: {
    leaderboard: LeaderboardEntry[];
    leaderboardMaxNum: number;
    cardSetImages: string[];
}) {
    const [countdown, setCountdown] = useState<string>();

    const leaderboardContent = useMemo(() => {
        return leaderboard
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
    }, [leaderboard, leaderboardMaxNum]);

    const dayInDecember = new Date().getDate();
    const imageUri = cardSetImages[dayInDecember - 1];

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
                setCountdown(`LIVE IN: ${minutes}: ${seconds}`);
            }
        }, 1000);
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "magenta",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "32px",
                }}
            >
                <div style={{ flex: 0, alignSelf: "flex-end", marginBottom: "-64px" }}>
                    <Text
                        style={{
                            fontSize: 64,
                            fontFamily: "Ink Free",
                            fontWeight: "bold",
                            textShadow: "black 1px 0 10px",
                            color: "white",
                        }}
                    >
                        {countdown}
                    </Text>
                </div>
                <div style={{ flex: 0 }}>
                    <img src="https://media.discordapp.net/attachments/787466774412787753/1180377698107932732/2022_advent_calendar_logo_copy.png" />
                </div>
                <Flex direction={"row"}>
                    <div
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
                            marginBottom={-20}
                            color="white"
                        >
                            Leaderboard
                        </Text>
                        {leaderboardContent}
                    </div>
                    <Flex
                        flexDirection="column"
                        marginBottom="-64px"
                        justifyContent="center"
                        alignItems="center"
                        minWidth="900px"
                    >
                        <img style={{ flex: 0, width: "500px" }} src={imageUri} />
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
            </div>
        </div>
    );
});
