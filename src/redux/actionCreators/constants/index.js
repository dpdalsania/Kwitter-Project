export const domain = "https://drashti-kwitter.herokuapp.com";
//export const domain = "http://localhost:3000";

export const jsonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export const handleJsonResponse = res => {
  if (res.ok) {
    //if the response is a status code of 200 - 299
    return res.json();
  }
  return res.json().then(result => {
    throw result;
  });
};
