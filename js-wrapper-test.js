(async function () {
  console.log("-- Running wrapper script --");

  const {
    sandbox,
    attributes,
    accountId,
    emailPositiveEngagement,
    pageIdentifier,
  } = window.rokt_config;

  const scripts = window.document.getElementsByTagName("script");
  const sources = Array.from(scripts);
  const roktIntegrationScriptRegexp = new RegExp(
    "https://apps(-demo|.stage|)?.rokt.com/(wsdk/)?integrations/launcher.js"
  );
  const launcherScript = sources.find((source) =>
    roktIntegrationScriptRegexp.test(source.src)
  );

  if (launcherScript) {
    window.roktCreateLauncher =
      window.roktCreateLauncher ||
      (await new Promise((resolve) => {
        if (window.Rokt) {
          resolve(window.Rokt.createLauncher);
        } else {
          launcherScript.addEventListener("load", () => {
            setTimeout(() => resolve(window.Rokt.createLauncher), 2000);
            // resolve(window.Rokt.createLauncher)
          });
        }
      }));

    const launcher = await window.roktCreateLauncher({
      accountId,
      sandbox,
      integrationName: "google",
    });

    const selectRoktPlacements = (identifier = pageIdentifier, attributes) => {
      return identifier
        ? launcher.selectPlacements({
            identifier,
            attributes,
          })
        : launcher.selectPlacements({
            attributes,
          });
    };

    if (emailPositiveEngagement) {
      const { email, ...rest } = attributes;

      const selection = await selectRoktPlacements(pageIdentifier, rest);

      selection.on("POSITIVE_ENGAGEMENT").subscribe(() => {
        selection.setAttributes({ email });
        selection.unsubscribe();
      });
    } else {
      const selection = selectRoktPlacements(pageIdentifier, attributes);
    }
  }
})();
