// We are using a relative path to go up from 'app/api/auth/[...nextauth]'
// to the root, and then down into 'src/auth.ts'.
// This bypasses the broken '@/' alias.
import { handlers } from "../../../../src/auth"; 

export const { GET, POST } = handlers;
