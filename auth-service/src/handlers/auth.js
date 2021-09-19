import jwt from "jsonwebtoken";
import middy from "@middy/core";
import cors from "@middy/http-cors";
import createError from "http-errors";
const generatePolicy = (principalId, methodArn) => {
  const apiGatewayWildcard = methodArn.split("/", 2).join("/") + "/*";

  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: apiGatewayWildcard,
        },
      ],
    },
  };
};

async function auth(event, context) {
  if (!event.authorizationToken) {
    throw new createError.Unauthorized("Unauthorized");
  }

  const token = event.authorizationToken.replace("Bearer ", "");

  try {
    const claims = jwt.verify(token, process.env.AUTH0_PUBLIC_KEY);
    const policy = generatePolicy(claims.sub, event.methodArn);

    return {
      ...policy,
      context: claims,
    };
  } catch (error) {
    console.log(error);
    throw new createError.Unauthorized("Unauthorized");
  }
}

export const handler = middy(auth).use(cors());
