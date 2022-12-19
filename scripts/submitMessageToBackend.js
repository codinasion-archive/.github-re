import fetch from "node-fetch";

export default async function submitMessageToBackend(
  OWNER,
  REPO,
  TOKEN,
  USERNAME,
  ISSUE_NUMBER,
  BACKEND_URL,
  BACKEND_ACCESS_TOKEN
) {
  await console.log(`Submitting message to backend...`);

  // get issue data
  const issueData = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/issues/${ISSUE_NUMBER}`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const issueDataJson = await issueData.json();

  const issueBody = issueDataJson.body;

  const bodySplit = issueBody.split("\n\n");

  const name = bodySplit[1].trim();
  console.log(name);

  const message = bodySplit[3].trim();
  console.log(message);

  // submit message to backend
  const submitMessageToBackend = await fetch(
    `${BACKEND_URL}/github/message-from-community/`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${BACKEND_ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        github_user: {
          username: USERNAME,
        },
        name: name,
        message: message,
        get_featured: true,
      }),
    }
  );

  if (submitMessageToBackend.status === 201) {
    await console.log("Message submitted to backend");
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
          body: `Message successfully submitted to backend :)
            
Thanks for your contribution to the community :sparkling_heart:
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
  } else {
    await console.log("=> Message not submitted to backend");
  }
}
