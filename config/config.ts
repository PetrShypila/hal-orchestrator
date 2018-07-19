const config = {
  nlu: {
    protocol: "http",
    host: "localhost",
    port: 8081,
    resource: "/parse",
    method: "POST",
  },
  manager:  {
    protocol: "http",
    host: "localhost",
    port: 8082,
    resource: "/request",
    method: "PUT",
  },
  nlg:  {
    protocol: "http",
    host: "localhost",
    port: 8083,
    resource: "/generate",
    method: "POST",
  },
};

export default config;