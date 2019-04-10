import axios from "axios";

class DropBoxApi {
  constructor(options) {
    this.authToken_ = null;
  }

  setAuthToken(token) {
    this.authToken_ = token;
  }
  deleteFile(path) {
    return axios.post(
      "https://api.dropboxapi.com/2/files/delete_v2",
      {
        path
      },
      {
        headers: {
          Authorization: `Bearer ${this.authToken_}`,
          "Content-Type": "application/json"
        }
      }
    );
  }
  uploadFile(content, path) {
    return axios.post(
      "https://content.dropboxapi.com/2/files/upload",
      content,
      {
        headers: {
          Authorization: `Bearer ${this.authToken_}`,
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": JSON.stringify({
            path,
            autorename: true,
            mode: "add"
          })
        }
      }
    );
  }

  previewURL(path) {
    return axios.post(
      "https://api.dropboxapi.com/2/files/get_temporary_link",
      { path },
      {
        headers: {
          Authorization: `Bearer ${this.authToken_}`,
          "Content-Type": "application/json"
        }
      }
    );
  }
}
export default DropBoxApi;
