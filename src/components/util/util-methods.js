const utilMethods = {
  generateRandomUUID() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  },
  clearJsonObject(jsonObject) {
    for (const key in jsonObject) {
      if (typeof jsonObject[key] == "string") {
        jsonObject[key] = '';
      } else if (Array.isArray(jsonObject[key])) {
        jsonObject[key] = [];
      }
    }
  },
  priceWithDots(price) {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  },
  getProductType(product) {
    let hasMemoryType = false;
    let hasSocketType = false;
    let result = null;
    for (let key in product) {
      switch (key) {
        case "memoryType":
          hasMemoryType = true;
          result = "ram";
          break;
        case "socketType":
          hasSocketType = true;
          result = "cpu";
          break;
        case "storageType":
          result = "storage";
          break;
        case "computerName":
          result = "computer";
          break;
        case "fanSize":
          result = "case-fan";
          break;
        case "caseType":
          result = "computer-case";
          break;
        case "waterCooled":
          result = "cooler";
          break;
        case "pcieType":
          result = "gpu";
          break;
        case "wattage":
          result = "power-supply";
          break;
      }
      if (hasMemoryType && hasSocketType) {
        result = "motherboard";
      }
    }
    return result;
  },
  sortOutMultipleArrays(resultArray, productsArray) {
    for (const list in productsArray) {
      switch (list) {
        case "caseFanList":
          for (const i in productsArray.caseFanList) {
            resultArray.push(productsArray.caseFanList[i]);
          }
          break;
        case "computerList":
          for (const i in productsArray.computerList) {
            resultArray.push(productsArray.computerList[i]);
          }
          break;
        case "gpuList":
          for (const i in productsArray.gpuList) {
            resultArray.push(productsArray.gpuList[i]);
          }
          break;
        case "motherboardList":
          for (const i in productsArray.motherboardList) {
            resultArray.push(productsArray.motherboardList[i]);
          }
          break;
        case "cpuList":
          for (const i in productsArray.cpuList) {
            resultArray.push(productsArray.cpuList[i]);
          }
          break;
        case "coolerList":
          for (const i in productsArray.coolerList) {
            resultArray.push(productsArray.coolerList[i]);
          }
          break;
        case "ramList":
          for (const i in productsArray.ramList) {
            resultArray.push(productsArray.ramList[i]);
          }
          break;
        case "storageList":
          for (const i in productsArray.storageList) {
            resultArray.push(productsArray.storageList[i]);
          }
          break;
        case "powerSupplyList":
          for (const i in productsArray.powerSupplyList) {
            resultArray.push(productsArray.motherboardList[i]);
          }
          break;
        case "computerCaseList":
          for (const i in productsArray.computerCaseList) {
            resultArray.push(productsArray.computerCaseList[i]);
          }
          break;
      }
    }
    resultArray.sort((a, b) => 0.5 - Math.random());
  },
  checkIfImageExists(item) {
    return item.image !== null && item.image !== "";
  },
  validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  },
}

export default utilMethods;
