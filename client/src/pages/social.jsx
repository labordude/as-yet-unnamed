import React, {useState, useEffect} from "react";
import {getUsers} from "../features/ui/helpers";
import {SimpleGrid, Container, Image, Box} from "@chakra-ui/react";
import UserCard from "../components/user-card"
export default function Social() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getUsers().then(data => setUsersList(data));
  }, []);

  return (
    <Container>
      <Container>
        <h2 className="text-center text-2xl font-bold">Social</h2>
      </Container>
      <Container>
        <div>
          <SimpleGrid columns={{sm: 2, md: 3}}>
            {usersList.map(user => (
              // <p>{user.username}</p>
              <UserCard key={user.id} user={user}/>
            ))}
          </SimpleGrid>
        </div>
      </Container>
    </Container>
  )
}
