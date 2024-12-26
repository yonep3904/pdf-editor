const constant = {
  api: {
    route: "/api",
    url: function (endpoint) {
      return `${this.route}${endpoint}`;
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
