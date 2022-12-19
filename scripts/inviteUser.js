import fetch from "node-fetch";

export default async function inviteUser(
  OWNER,
  REPO,
  TOKEN,
  USERNAME,
  ISSUE_NUMBER
) {
  await console.log(`Inviting ${USERNAME} to ${OWNER} :)`);

  // send invitation to user
  await fetch(
    `https://api.github.com/orgs/${OWNER}/teams/everyone/memberships/${USERNAME}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  // comment on issue
  await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/issues/${ISSUE_NUMBER}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        body: `Hey @${USERNAME}

Welcome to ${OWNER} :tada:

An invitation has been sent to you to join the organization. Please check your email for the invitation and accept it.
`,
      }),
    }
  );

  // close issue
  await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/issues/${ISSUE_NUMBER}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        state: "closed",
      }),
    }
  );

  // end of inviteUser function
}
