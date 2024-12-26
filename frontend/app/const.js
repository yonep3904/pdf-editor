const constant = {
  api: {
    host: "127.0.0.1",
    port: "5000",

    url: function (endpoint) {
      return `http://${this.host}:${this.port}${endpoint}`;
    },
  },
};

export default constant;
