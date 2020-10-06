export const values = [
    {
        "value": "Oil, Gas & Consumable Fuels",
        "key": 134
    },
    {
        "value": "Energy Equipment & Services",
        "key": 104
    },
    {
        "value": "Commercial Services & Supplies",
        "key": 29
    },
    {
        "value": "Oil, Gas & Consumable Fuels 1",
        "key": 1
    },
    {
        "value": "Energy Equipment & Services 2",
        "key": 2
    },
    {
        "value": "Commercial Services & Supplies 3",
        "key": 3
    },
    {
        "value": "Oil, Gas & Consumable Fuels 4",
        "key": 4
    },
    {
        "value": "Energy Equipment & Services 5",
        "key": 5
    },
    {
        "value": "Commercial Services & Supplies 6",
        "key": 6
    }
];

export const currentValue = [values[1], values[3]];

const createAsyncValues = () => {
    let isResolved = false;
    return (resp = values) =>
        !isResolved ? new Promise(resolve => setTimeout(() => {
            isResolved = true;
            resolve(resp);
        }, 1000)) : new Promise(resolve => resolve(resp));
};

export const asyncValues = createAsyncValues();