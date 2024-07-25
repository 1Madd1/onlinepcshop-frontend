import {boot} from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ({urlPath, redirect}) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    if (cookie.split("=")[0] === "kc_auth"
      && cookie.split("=")[1] === "starting") {
      document.cookie = "kc_auth=not_starting";
      return;
    }
  }
  const authToken = document.cookie.split("=")[1];
  if ((authToken === undefined || authToken === null) && !urlPath.endsWith("home")) {
    redirect({path: "/home"});
  }
})
