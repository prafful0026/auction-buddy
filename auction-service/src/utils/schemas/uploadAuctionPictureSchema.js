const Schema = {
  type: "object",
  properties: {
    body: {
      type: "string",
      minLength: 1,
      pattern: "=$",
    },
  },
  required: ["body"],
};

export default Schema;
