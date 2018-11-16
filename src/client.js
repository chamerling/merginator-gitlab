const axios = require('axios');
const debug = require('debug')('merginator:client');

class Client {
  constructor(url, token) {
    this.client = axios.create({ baseURL: url, headers: { 'Private-Token': token }});
  }

  fetchMergeRequests() {
    debug('Fetch merge requests');
    return this.client.get('/api/v4/merge_requests?state=opened');
  }

  getMergeRequest({ project_id, iid }) {
    debug('Get merge request', project_id, iid);
    return this.client.get(`/api/v4/projects/${project_id}/merge_requests/${iid}`);
  }

  merge({ project_id, iid }) {
    debug('Merge merge request', project_id, iid);
    return this.client.put(`/api/v4/projects/${project_id}/merge_requests/${iid}/merge`);
  }
}

module.exports = Client;