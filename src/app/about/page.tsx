import React from "react";
import {Container, Title, Text, Image, Space, Flex} from "@mantine/core";
// import { title } from "process";
import classes from "@/app/about/about.module.scss";

interface ContentsProps {
    title: string;
    text: string;
    imageUrl: string;
    reverse: boolean; //to reverse the flex direction
}

const ContentBlock: React.FC<ContentsProps> = ({
                                                   title,
                                                   text,
                                                   imageUrl,
                                                   reverse,
                                               }) => {
    return (
        <Flex
            direction={reverse ? "row-reverse" : "row"}
            wrap="wrap"
            justify="space-evenly"
            gap="xl"
        >
            <div className={classes.content_text}>
                <Title order={3}>{title}</Title>
                <Text size="md">{text}</Text>
            </div>
            <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={200}
                radius="md"
            />
        </Flex>
    );
};

const About: React.FC = () => {
    const contents = [
        {
            title: "sample 1",
            text: "This is a sample text that describes the content of the image below.",
            imageUrl: "/samples/sample1.jpg",
        },
        {
            title: "sample 2",
            text: "This is a sample text that describes the content of the image below.",
            imageUrl: "/samples/sample2.jpg",
        },
        {
            title: "sample 3",
            text: "This is a sample text that describes the content of the image below.",
            imageUrl: "/samples/sample3.jpg",
        },
        {
            title: "sample 4",
            text: "This is a sample text that describes the content of the image below.",
            imageUrl: "/samples/sample3.jpg",
        },
    ];
    return (
        <>
            <Title ta="center">About Us</Title>
            <Space h="xl"/>
            <Flex direction="column" gap="xl">
                {contents.map((content, index) => (
                    <ContentBlock
                        key={index}
                        title={content.title}
                        text={content.text}
                        imageUrl={content.imageUrl}
                        reverse={index % 2 === 1}
                    />
                ))}
            </Flex>
        </>
    );
};

export default About;
