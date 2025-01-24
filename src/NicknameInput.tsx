import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "./components/ui/button.tsx";
import {Card, SimpleGrid } from "@chakra-ui/react";
import {Input} from "./components/ui/input.tsx";

export default function NicknameInput() {
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nickname) {
            sessionStorage.setItem("nickname", nickname);
            navigate("/home");
        } else {
            alert("닉네임을 입력해주세요!");
        }
    };

    return (
        <>
            <div className="mt-10 text-center">
                <h1 className="text-3xl font-semibold text-gray-800">Guess It!</h1>
            </div>

            <div className="mt-10 flex flex-col items-center text-center">
                <SimpleGrid columns={1} gap="4">
                    <Card.Root width="320px" variant={"elevated"}>
                        <form onSubmit={handleSubmit}>
                            <Card.Body gap="2">
                                <Card.Title mb="2">
                                    <div className="flex items-center space-x-2 text-lg">
                                        <h1>닉네임을 입력하세요</h1>
                                    </div>
                                </Card.Title>
                                <Card.Description>
                                    <Input
                                        type="text"
                                        placeholder="닉네임"
                                        value={nickname}
                                        onChange={handleNicknameChange}
                                    />
                                </Card.Description>
                            </Card.Body>
                            <Card.Footer justifyContent="flex-end">
                                <Button type="submit">Join</Button>
                            </Card.Footer>
                        </form>
                    </Card.Root>
                </SimpleGrid>
            </div>
        </>
    );
}