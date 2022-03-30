import { onMount } from "solid-js";
import { createStore } from "solid-js/store";
export default function useBattery() {
  const [store, setStore] = createStore({
    isSupported: true,
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 0,
  });
  onMount(async () => {
    const battery = await navigator.getBattery();

    if (!battery) {
      setStore("isSupported", false);
      return;
    }
    updateAllBatteryInfo(battery);

    battery.addEventListener("chargingchange", () => {
      updateChargeInfo(battery);
    });
    battery.addEventListener("levelchange", () => {
      updateLevelInfo(battery);
    });
    battery.addEventListener("chargingtimechange", () => {
      updateChargingInfo(battery);
    });
    battery.addEventListener("dischargingtimechange", () => {
      updateDischargingInfo(battery);
    });
  });

  function updateAllBatteryInfo(battery) {
    updateChargeInfo(battery);
    updateLevelInfo(battery);
    updateChargingInfo(battery);
    updateDischargingInfo(battery);
  }

  function updateChargeInfo(battery) {
    setStore("charging", battery.charging);
  }

  function updateLevelInfo(battery) {
    setStore("level", battery.level);
  }

  function updateChargingInfo(battery) {
    setStore("chargingTime", battery.chargingTime);
  }

  function updateDischargingInfo(battery) {
    setStore("dischargingTime", battery.dischargingTime);
  }

  return {
    store,
  };
}
