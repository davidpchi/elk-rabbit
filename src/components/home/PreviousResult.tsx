import React from "react";

import { Flex, Heading, Image, Text } from "@chakra-ui/react";

import { HistoryEntry } from "../../types/HistoryEntry";

export const PreviousResult = React.memo(function PreviousResult({
    result,
}: {
    result: HistoryEntry | undefined;
}) {
    if (result === undefined) {
        return null;
    }

    const winningCards = result.winningCards.map((value, index) => {
        return <Image maxWidth={"300px"} key={index} src={value} flex={1} />;
    });

    const winners = result.winningPlayers.map((value, index) => {
        return (
            <Text fontSize={20} key={index}>
                {value}
            </Text>
        );
    });

    return (
        <Flex
            flexDirection={"row"}
            flexWrap={"wrap"}
            borderWidth={"2px"}
            padding={"16px"}
            justifyContent={"center"}
            borderRadius={"8px"}
        >
            <Flex flexDirection={"row"} flexWrap={"wrap"} gap={"16px"} justifyContent={"center"}>
                {winningCards}
            </Flex>
            <Flex flexDirection={"column"} maxWidth={"300px"}>
                <Heading size={"lg"} marginBottom={"-16px"}>
                    Guess Winners
                </Heading>
                {winners.length > 0 ? (
                    <>{winners}</>
                ) : (
                    <Text fontSize={20}>{"None! Better luck next time!"}</Text>
                )}
                {result.tiebreakerWinner ? (
                    <>
                        <Heading size={"lg"} marginBottom={"-16px"}>
                            Tiebreaker WINNER
                        </Heading>
                        <Text fontSize={20}>{result.tiebreakerWinner}</Text>
                    </>
                ) : null}
            </Flex>
        </Flex>
    );
});
