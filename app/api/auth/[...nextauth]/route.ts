// Importaciones necesarias
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
export const authOptions: AuthOptions = {
  providers: [
    // Proveedor de Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Proveedor de Azure AD
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      tenantId: process.env.MICROSOFT_TENAT_ID as string,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };