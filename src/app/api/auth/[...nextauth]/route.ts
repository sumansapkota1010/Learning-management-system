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
    async session({ session, user }: { session: any; user: any }) {
      const data = await User.findOne({ email: session.user.email });
      if (data) {
        session.user.role = data.role || "student";
        session.user.id = data._id.toString();
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
