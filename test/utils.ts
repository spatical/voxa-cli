import * as _ from "lodash";
import fs = require("fs");

let googleSecret: any;
let officeSecret: any;
try {
  // tslint:disable-next-line: no-var-requires
  googleSecret = require("./client_secret.json");
} catch (e) {
  // tslint:disable-next-line: no-console
  console.log("No client secret for google");
}

try {
  // tslint:disable-next-line: no-var-requires
  officeSecret = require("./azure_secret.json");
} catch (e) {
  // tslint:disable-next-line: no-console
  console.log("No client secret for azure");
}

type interactionNames =
  | "Google"
  | "Excel"
  | "Office365"
  | "OpenDocument-FODS"
  | "OpenDocument-ODS"
  | "platform-specific"
  | "Excel-No-Dialog";

function loadInteraction(name: interactionNames) {
  try {
    const interactionFileName = `${__dirname}/interaction-files/interaction-${name.toLowerCase()}.json`;
    const interaction = JSON.parse(fs.readFileSync(interactionFileName).toString());
    return { ...interaction, interactionFileName, name };
  } catch {
    return { name, skip: true };
  }
}

export function configurationToExecute() {
  const excelInteraction = loadInteraction("Excel");
  const openDocumentFODSInteraction = loadInteraction("OpenDocument-FODS");
  const openDocumentODSInteraction = loadInteraction("OpenDocument-ODS");
  const googleInteraction = loadInteraction("Google");
  const Office365Interaction = loadInteraction("Office365");
  const platformSpecificInteraction = loadInteraction("platform-specific");
  const excelNoDialogInteraction = loadInteraction("Excel-No-Dialog");

  if (_.isEmpty(googleSecret)) {
    googleInteraction.skip = true;
  }

  if (_.isEmpty(officeSecret)) {
    Office365Interaction.skip = true;
  }

  return [
    googleInteraction,
    excelInteraction,
    openDocumentFODSInteraction,
    openDocumentODSInteraction,
    Office365Interaction,
    platformSpecificInteraction,
    excelNoDialogInteraction
  ];
}
