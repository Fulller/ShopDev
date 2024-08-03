import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import env from "../configs/env.config.js";

function configureGoogleAuthPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.auth.google.clientID,
        clientSecret: env.auth.google.clientSecret,
        callbackURL: `${env.app.serverUrl}/api/user/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  console.log("CONFIGURED ::  PASSPORT :: GOOOGLE");
}

function configureGitHubAuthPassport() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: env.auth.github.clientID,
        clientSecret: env.auth.github.clientSecret,
        callbackURL: `${env.app.serverUrl}/api/user/github/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  console.log("CONFIGURED ::  PASSPORT :: GITHUB");
}
export { configureGoogleAuthPassport, configureGitHubAuthPassport };
