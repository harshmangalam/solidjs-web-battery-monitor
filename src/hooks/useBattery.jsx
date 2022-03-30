import { onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
export default function useBattery() {
  const [store, setStore] = createStore({
    isSupported: true,
    battery: null,
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 0,
  });
  onMount(async () => {
    try {
      const battery = await navigator.getBattery();
      setStore("battery", battery);
      setStore("charging", battery.charging);
      setStore("level", battery.level);
      setStore("chargingTime", battery.chargingTime);
      setStore("dischargingTime", battery.dischargingTime);
      battery.addEventListener("chargingchange", updateChargeInfo);
      battery.addEventListener("levelchange", updateLevelInfo);
      battery.addEventListener("chargingtimechange", updateChargingInfo);
      battery.addEventListener("dischargingtimechange", updateDischargingInfo);
    } catch (error) {
      console.log(error);
      setStore("isSupported", false);
    }
  });

  onCleanup(() => {
    store.battery.removeEventListener("chargingchange", updateChargeInfo);
    store.battery.removeEventListener("levelchange", updateLevelInfo);
    store.battery.removeEventListener("chargingtimechange", updateChargingInfo);
    store.battery.removeEventListener(
      "dischargingtimechange",
      updateDischargingInfo
    );
  });

  function updateChargeInfo(e) {
    setStore("charging", e.currentTarget.charging);
  }

  function updateLevelInfo(e) {
    setStore("level", e.currentTarget.level);
  }

  function updateChargingInfo(e) {
    setStore("chargingTime", e.currentTarget.chargingTime);
  }

  function updateDischargingInfo(e) {
    setStore("dischargingTime", e.currentTarget.dischargingTime);
  }

  return {
    store,
  };
}
