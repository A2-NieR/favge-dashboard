import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      authorization: {
        url: `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_ID}&response_type=code&redirect_uri=${process.env.DISCORD_REDIRECT_URI}&scope=identify+guilds`,
        params: { scope: "identify guilds" },
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    },
  },
});
