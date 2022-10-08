const KEY = "redux";
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    const storeObject = JSON.parse(serializedState);
    const startDate = new Date(storeObject.daterange[0].startDate);
    const endDate = new Date(storeObject.daterange[0].endDate);
    storeObject.daterange[0].startDate = startDate;
    storeObject.daterange[0].endDate = endDate;
    return storeObject;
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}
