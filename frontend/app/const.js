const constant = {
  api : {
    host: 'locahost',
    port: '5000',
    url: endpoint => {
      return `http://${this.host}:${this.port}${endpoint}`; 
    },
    
  },

};

export default constant;