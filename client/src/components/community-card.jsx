import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  Image,
  Stack,
  Heading,
  Divider,
  Button,
} from "@chakra-ui/react";
export default function CommunityCard({community}) {
  return (
    <Card maxW="sm" className="m-2">
      <CardBody>
        <Image
          src={community.image}
          alt={community.name}
          borderRadius="md"
          className="mx-auto h-32"
        />
        <Stack mt="4" spacing="1" className="items-center">
          <Heading size="lg">{community.name}</Heading>
          <Text></Text>
          <Text color="blue.600" fontSize="xl">
            Come on in
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
