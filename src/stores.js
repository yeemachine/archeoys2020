import { writable } from 'svelte/store';

export const PAGE = writable('home')
export const WIDTH = writable(0);
export const SCROLLY = writable(0);
export const HEIGHT = writable(0.01);

export const currentFloor = writable(null)
export const currentFloorID = writable(null)

export const currentCollectionID = writable(null)
export const currentFrameID = writable(null);
export const currentPostID = writable(null);
export const currentPlanID = writable(null);
export const currentPostArr = writable([]);
export const currentPostArrIDs = writable([]);
export const expandBottomNav = writable(false);
export const frameLoaded = writable(false);
