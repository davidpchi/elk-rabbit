import React from "react";

import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import { MagicSet } from "../../types/MagicSet";

const googleFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSfrE6W0BaAw0wWKa39Y-CgMZEru7XiAm7sE89PMcPrvvn5yyA/viewform";

export const UpNext = React.memo(function UpNext({
    schedule,
    streamMode,
}: {
    schedule: MagicSet[] | undefined;
    streamMode?: boolean;
}) {
    const bgColor = streamMode ? undefined : "rgb(0,0,0,0.8)";

    // if there are no sets populated, then show a "stay tuned screen"
    if (schedule === undefined) {
        return (
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Heading>Stay Tuned!</Heading>
                <Flex
                    maxWidth={500}
                    backgroundColor={bgColor}
                    padding={16}
                    borderRadius={20}
                    direction={"column"}
                >
                    <Text fontSize={20}>Nothing yet, but stay tuned for more!</Text>
                </Flex>
            </Flex>
        );
    }

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    let currentSet: MagicSet | undefined = undefined;

    if (month === 11) {
        // in the month of novemeber, show the first show day
        currentSet = schedule[0];
    }

    if (month === 12) {
        if (day >= 24) {
            // If we are in december, the last show day is on 23rd.
            // From the 24th onward, show the "Thanks" screen.
            return (
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Heading>THANKS FOR PLAYING</Heading>
                    <Flex
                        maxWidth={500}
                        backgroundColor={bgColor}
                        padding={16}
                        borderRadius={20}
                        direction={"column"}
                    >
                        <Text fontSize={20} color="white">
                            That's all for this year! Join us next year!
                        </Text>
                    </Flex>
                </Flex>
            );
        } else {
            currentSet = schedule[day];
        }
    }

    const navigateToForm = () => {
        window.location.href = googleFormLink;
    };

    return (
        <Flex flexDirection={"column"} alignItems={"center"}>
            {streamMode ? null : <Heading>COMING UP NEXT: </Heading>}
            <Flex
                maxWidth={500}
                backgroundColor={bgColor}
                padding={16}
                borderRadius={20}
                direction={"column"}
            >
                <Image
                    maxWidth={"100%"}
                    src={currentSet?.imageUri}
                    objectFit={"contain"}
                    marginBottom={"16px"}
                    alt={currentSet?.name}
                />
                <Heading size={"sm"} color={"white"}>
                    {currentSet?.name}
                </Heading>
                {streamMode ? null : <Button onClick={navigateToForm}>PICK YOUR GUESSES</Button>}
            </Flex>
        </Flex>
    );
});
