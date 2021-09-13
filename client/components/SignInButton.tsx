import { useClerk } from "@clerk/clerk-react";

import {
    Button
} from "@chakra-ui/react";

type SignInButtonProps = {
    text?: string
};

export default function SignInButton({ text = "Sign in" }: SignInButtonProps) {
    const { openSignIn } = useClerk();

    return (
        <Button variant="outline" onClick={() => openSignIn({})}>
            {text}
        </Button>
    );
}
