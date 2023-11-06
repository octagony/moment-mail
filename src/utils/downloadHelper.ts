import axios from "axios";

export const downloadHelper = async (url: string, fileName: string) => {
  return axios({
    url,
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const href = window.URL.createObjectURL(response.data);

      const anchorElement = document.createElement("a");

      anchorElement.href = href;
      anchorElement.download = fileName;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    })
    .catch((error) => {
      throw new TypeError("Unable to download file");
    });
};
