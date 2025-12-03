import Ajv from "ajv";
import crypto from "crypto";

const ajv = new Ajv();

const eventSchema = {
  type: "object",
  properties: {
    trackId: { type: "string" },
    userId: { type: "string" },
    timestamp: { type: "integer" },
    eventType: {
      type: "string",
      pattern: "^play|pause|progress-0|progress-25|progress-75|progress-100$",
    },
    trackTime: { type: "number" },
  },
  required: ["trackId", "userId", "timestamp", "eventType"],
};

export function isValidData(data: object) {
  return ajv.validate(eventSchema, data);
}

export function getFingerprint(data: object) {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}
