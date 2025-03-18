import NextAuth, { DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      authorization: {
        url: `https://discord.com/oauth2/authorize?client_id=${process.env.AUTH_DISCORD_ID}&response_type=code&redirect_uri=${process.env.DISCORD_REDIRECT_URI}&scope=identify+guilds`,
        params: { scope: "identify guilds" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
    async signIn() {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    },
  },
});
