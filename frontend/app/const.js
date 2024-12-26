const constant = {
  api: {
    host: "127.0.0.1",
    port: "5000",

    url: function (endpoint) {
      return `http://${this.host}:${this.port}${endpoint}`;
    },
  },
  github: {
    name: "yonep3904",
    repository: "pdf-editor",
    get link() {
      return `https://github.com/${this.name}/${this.repository}`;
    },
  },
};

export default constant;
