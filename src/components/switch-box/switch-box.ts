import { Component, Input, OnInit } from "@angular/core";

/**
 * Generated class for the SwitchBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "switch-box",
  templateUrl: "switch-box.html",
})
export class SwitchBoxComponent implements OnInit {
  @Input() deviceListConfiguration: any;

  deviceSelected = [];

  constructor() {}

  ngOnInit() {
    if (this.deviceListConfiguration) {
      for (let i = 0; i < this.deviceListConfiguration.length; i++)
        this.deviceSelected.push(false);
      console.log(this.deviceSelected);
    }
  }

  deviceClicked(deviceName: String, index) {
    this.deviceSelected[index] = !this.deviceSelected[index];
  }
  updateToggleItem(deviceName: String) {}
}
