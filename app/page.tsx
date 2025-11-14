import { auth } from "@/auth"; // Import the auth function
import HomePageClient from "@/components/HomePageClient"; // Import our new client component
import { Session } from "next-auth"; // Import the Session type

export default async function HomePage() {
    // 1. Get the session on the server
    const session: Session | null = await auth();
    const user = session?.user;

    // 2. Render the Client Component and pass the user data to it.
    // The server does the data fetching, the client does the animation.
    return (
        <HomePageClient user={user} />
    );
}
