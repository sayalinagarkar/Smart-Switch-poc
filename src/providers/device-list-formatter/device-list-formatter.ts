import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the DeviceListFormatterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceListFormatterProvider {
  constructor() {}

  getDeviceListConfiguration() {
    return [
      {
        name: "Bulb",
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: "false",
      },
      {
        name: "Refrigerator",
        iconUrl: "../../assets/imgs/fridge.png",
        iconUrlSwitchOn: "../../assets/imgs/fridge-on.png",
        toggleValue: "false",
      },
      {
        name: "Fan",
        iconUrl: "../../assets/imgs/fan.png",
        iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
        toggleValue: "false",
      },
      {
        name: "Air Conditioner",
        iconUrl: "../../assets/imgs/ac.png",
        iconUrlSwitchOn: "../../assets/imgs/ac-on.png",
        toggleValue: "false",
      },
    ];
  }
}
