import React from "react";

import { Text } from "@chakra-ui/react";

import { LeaderboardEntry } from "../../types/LeaderboardEntry";

export const Leaderboard = React.memo(function Leaderboard({
    leaderboard,
}: {
    leaderboard: LeaderboardEntry[];
}) {
    const elements = leaderboard
        ? leaderboard.map((entry, index) => {
              return (
                  <Text fontSize={20} key={index}>
                      {`${entry.name}: ${entry.score}`}
                  </Text>
              );
          })
        : null;

    if (elements === null || elements.length === 0) {
        return <Text fontSize={20}>{"No winners...yet!"}</Text>;
    }

    return elements;
});
