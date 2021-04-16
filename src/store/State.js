import {atom} from 'recoil';

const panelState = atom({
    key: "panel",
    default: false
});

export { panelState }