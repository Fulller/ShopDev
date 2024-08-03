import _ from "lodash";

function googleToLocal(profile) {
  return {
    usr_avatar: _.get(profile, "photos[0].value", ""),
    usr_slug: _.kebabCase(profile.displayName),
    usr_name: profile.displayName,
    usr_email: _.get(profile, "emails[0].value", ""),
    usr_isFromSocial: true,
    usr_provider: {
      name: profile.provider,
      id: profile.id,
    },
  };
}

function githubToLocal(profile) {
  return {
    usr_avatar: _.get(profile, "photos[0].value", ""),
    usr_slug: profile.username,
    usr_name: profile.displayName,
    usr_isFromSocial: true,
    usr_provider: {
      name: profile.provider,
      id: profile.id,
    },
  };
}

export { googleToLocal, githubToLocal };
