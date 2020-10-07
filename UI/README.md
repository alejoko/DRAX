## Architecture Decisions

* React-Redux: Decided to use React and Redux for the possibility of the control of the state (as unique source of truth), and React because the trusted libreries to increase the performace (as react-virtualized)

* Redux-Ducks: I used Ducks to apply with success, a modular organization of my redux elements.

* TypeScript: I took the decision to use TypeScript for increase hardyness and sturdiness to faults, and because writing types makes it easier to write and read the code.

* react-virtualized: This react library provides virtualization to just render information that encloses the viewport (on screen). So performance increases a lot without rendereing the whole lists elements.

* react-lazy-load-image-component: This libary allows to load images just when it shows in viewport (with the help of virtualized), so it is a good point to increase performance.

## How to run ?

* App: `yarn start`