import core from "@actions/core";

import inviteUser from "./scripts/inviteUser.js";
import submitMessageToBackend from "./scripts/submitMessageToBackend.js";

// main action function
(async () => {
  try {
    console.log("Hii there !!!");

    // get action default data
    const OWNER = await core.getInput("OWNER");
    const REPO = await core.getInput("REPO");

    const TOKEN = await core.getInput("TOKEN");

    const INVITE_USER = await core.getInput("INVITE_USER");
    const USERNAME = await core.getInput("USERNAME");
    const ISSUE_NUMBER = await core.getInput("ISSUE_NUMBER");

    const SUBMIT_MESSAGE_TO_BACKEND = await core.getInput(
      "SUBMIT_MESSAGE_TO_BACKEND"
    );
    const BACKEND_URL = await core.getInput("BACKEND_URL");
    const BACKEND_ACCESS_TOKEN = await core.getInput("BACKEND_ACCESS_TOKEN");

    if (INVITE_USER === "true") {
      await inviteUser(OWNER, REPO, TOKEN, USERNAME, ISSUE_NUMBER);
    }

    if (SUBMIT_MESSAGE_TO_BACKEND === "true") {
      await submitMessageToBackend(
        OWNER,
        REPO,
        TOKEN,
        USERNAME,
        ISSUE_NUMBER,
        BACKEND_URL,
        BACKEND_ACCESS_TOKEN
      );
    }

    // end of main function
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
