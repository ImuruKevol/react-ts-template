import { adminLogin } from "@/utils/api";
import { FC, useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";

const Login: FC = () => {
    const [password, setPassword] = useState<string>("");
    const login = async () => {
        const res = await adminLogin(password);
        if (res === "True") {
            window.location.href = "/policy";
        }
    };

    return (
        <>
            <h2>Login</h2>
            <InputGroup className="mb-3 mt-4 password-wrap">
                <InputGroup.Text id="basic-addon1">PASSWORD</InputGroup.Text>
                <FormControl
                    type="password"
                    placeholder="Password"
                    aria-label="password"
                    aria-describedby="basic-addon1"
                    value={password}
                    onChange={(e) => {
                        const { value } = e.target;
                        setPassword(value);
                    }}
                />
            </InputGroup>
            <div className="table-action login-wrap">
                <Button className="login" variant="primary" onClick={login}>
                    Login
                </Button>
            </div>
        </>
    );
};

export default Login;
