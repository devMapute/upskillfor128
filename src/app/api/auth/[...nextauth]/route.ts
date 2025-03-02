import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    async signIn({ user, account, profile }: { user: any, account: any, profile?: any }) {
      try {
        // Check if user exists
        const { data: existingUser, error: queryError } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.email)
          .single();

        if (queryError && queryError.code !== 'PGRST116') {
          console.error('Error checking user:', queryError);
        }

        if (!existingUser) {
          // Create new user if doesn't exist
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: account.provider,
              provider_id: account.providerAccountId
            });
            
          if (insertError) console.error('Error saving user to Supabase:', insertError);
        } else {
          // Update existing user
          const { error: updateError } = await supabase
            .from('users')
            .update({
              name: user.name,
              image: user.image,
              last_sign_in: new Date().toISOString()
            })
            .eq('email', user.email);
            
          if (updateError) console.error('Error updating user:', updateError);
        }
        
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return true; // Still allow sign in even if DB operation fails
      }
    },
    async jwt({ token, user, account }: { token: any, user?: any, account?: any }) {
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