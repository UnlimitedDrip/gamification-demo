/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
export default (app) => {
  app.log.info("Yay, the app was loaded!");

  app.on("issue_comment", async (context) => {
    const commentBody = context.payload.comment.body;
    const hasSlash = commentBody.includes("/");
    const matches = commentBody.match(/\/([^ ]+)/);
    
    
    if (hasSlash && matches) {
      const command = matches[1];
      await processCommand(context, command);
    }
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

  

  async function processCommand(context, command){
    const repoDetails = context.repo();
    await context.octokit.issues.createComment({
      ...repoDetails,
      issue_number: context.payload.issue.number,
      body: 'Command received: '+ command,
    });
    try {
      await commandMatcher(context, command)
    }
    catch{
      context.octokit.issues.createComment({
        ...repoDetails,
        issue_number: context.payload.issue.number,
        body: command + " is not a valid command try something else...",
      });
    }
  }

  async function commandMatcher(context, command){
    
  }
};
