const constant = {
  api: {
    baseUrl: process.env.API_BASE_URL,
    url: function (endpoint) {
      return `${this.baseUrl}${endpoint}`;
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
