import { OpenIDUserInfo } from 'types/document';

export function parseOpenIDUserInfo(userInfo: OpenIDUserInfo) {
  const {
    sub,
    name,
    given_name,
    family_name,
    middle_name,
    nickname,
    preferred_username,
    profile,
    picture,
    website,
    email,
    email_verified,
    gender,
    birthdate,
    zoneinfo,
    locale,
    phone_number,
    phone_number_verified,
    address,
    updated_at,
  } = userInfo || {};

  return {
    sub,
    name,
    given_name,
    family_name,
    middle_name,
    nickname,
    preferred_username,
    profile,
    picture,
    website,
    email,
    email_verified,
    gender,
    birthdate,
    zoneinfo,
    locale,
    phone_number,
    phone_number_verified,
    address,
    updated_at,
  };
}
