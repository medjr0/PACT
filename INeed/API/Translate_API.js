import translate from 'translate-google-api';

function getProxy () {
  return fetch('http://pubproxy.com/api/proxy?format=json')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getObjectTradFromApi(tab,object,language) {
  return new Promise((successCallback, failureCallback) => {
  n = tab.length
  tab.forEach((item, i) => {translate(object[tab[i]], {tld: "com", to: language}).then(res => {object[tab[i]] = res[0]; n -= 1; if (n == 0){successCallback();}}).catch(err => {failureCallback(console.log(err))});
  });})
}
