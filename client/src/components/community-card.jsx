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
    <div className="transform transition-transform hover:scale-110">
    <Card maxW="sm" className="m-2" style={{backgroundColor:"#1E2D24", boxShadow:"4px 5px 8px rgba(0, 0, 0, 1)"}}>
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
          <Text style={{color:"#6366F1"}} fontSize="17px">
            Come on in
          </Text>
        </Stack>
      </CardBody>
    </Card>
    </div>
  );
}
