import {Card, SimpleGrid} from "@chakra-ui/react";
import {IoMdLock} from "react-icons/io";
import {Button} from "./components/ui/button.tsx";
import {BsDoorOpenFill} from "react-icons/bs";

export default function Home() {
  const roomList = [
    {name: "같이 연상퀴즈 해요~!",
    code: "#DFWA2736",
    locked: true},
    {name: "연상퀴즈 ㄱㄱ",
      code: "#QWER1234",
      locked: false},
    {name: "3번방",
      code: "#ABDW9280",
      locked: false},
    {name: "4번방",
      code: "#ABDW9280",
      locked: true},
    {name: "5번방",
      code: "#ABDW9280",
      locked: false}
  ];
  return (
      <>
        <div className="mt-10 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Guess It!</h1>
        </div>

        <div className="mt-5 text-center">
          <Button variant={"secondary"}><BsDoorOpenFill /> 방 만들기</Button>
        </div>

        <div className="mt-10 flex flex-col items-center text-center">
          <SimpleGrid columns={2} gap="4">
            {roomList.map((value) => (
                <Card.Root width="320px" variant={"elevated"} key={"elevated"}>
                  <Card.Body gap="2">
                    <Card.Title mb="2">
                      <div className="flex items-center space-x-2 text-lg">
                        {value.locked ? <IoMdLock/> : ''} {value.name}
                      </div>
                    </Card.Title>
                    <Card.Description>
                      {value.code}
                    </Card.Description>
                  </Card.Body>
                  <Card.Footer justifyContent="flex-end">
                    <Button>Join</Button>
                  </Card.Footer>
                </Card.Root>
            ))}
          </SimpleGrid>
        </div>
      </>
  );
}
