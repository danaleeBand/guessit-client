import {Button, Card, Stack} from "@chakra-ui/react";

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
      locked: false},
    {name: "5번방",
      code: "#ABDW9280",
      locked: false}
  ];
  return (
      <>
        <div className="mt-24 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Guess It!</h1>
        </div>

        <Button variant="solid" color>버튼</Button>
        <Stack gap="4" direction="row" wrap="wrap">
          {roomList.map((value) => (
              <Card.Root width="320px" variant={"elevated"} key={"elevated"}>
                <Card.Body gap="2">
                  <Card.Title mb="2">{value.name}</Card.Title>
                  <Card.Description>
                    This is the card body. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </Card.Description>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                  <Button variant="outline">View</Button>
                  <Button>Join</Button>
                </Card.Footer>
              </Card.Root>
          ))}

        </Stack>

        <div className="mt-10 flex flex-col items-center text-center">
          <table className="table-auto border">
            <tbody>
              <tr>
                <th>방 제목</th>
                <th>방 코드</th>
                <th>잠금여부</th>
              </tr>
              {roomList.map((value) => (
                <tr>
                  <td>{value.name}</td>
                  <td>{value.code}</td>
                  <td>{value.locked ? '🔒' : '🔓'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </>
  );
}
