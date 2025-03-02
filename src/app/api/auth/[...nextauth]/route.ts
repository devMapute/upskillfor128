import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  debug: true,
  callbacks: {
    async jwt({ token, user, account }: { token: any, user: any, account: any }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };