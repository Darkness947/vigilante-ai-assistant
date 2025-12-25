import { auth } from "@/auth";
import ContactClient from "@/components/ContactClient";

export default async function ContactPage() {
    const session = await auth();
    return <ContactClient user={session?.user} />;
}
