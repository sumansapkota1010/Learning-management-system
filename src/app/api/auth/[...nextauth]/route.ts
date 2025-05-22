import connectDb from "@/database/connection";
import User from "@/database/models/user.schema";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }: any): Promise<boolean> {
      try {
        await connectDb();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            username: user.name,
            email: user.email,
            profileImage: user.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async jwt({ token }) {
      await connectDb();
      const userExists = await User.findOne({ email: token.email });
      if (userExists) {
        token.id = userExists._id;
        token.role = userExists.role;
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      console.log(token.id, "token id");
      console.log(session, "Sessionnn");
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
