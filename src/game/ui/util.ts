const formatSpec = {
    minimumFractionDigits: 2
};

const denominations = [
    { value: 10e30, label: 'Yt' },
    { value: 10e27, label: 'Zt' },
    { value: 10e24, label: 'Et' },
    { value: 10e21, label: 'Pt' },
    { value: 10e18, label: 'Tt' },
    { value: 10e15, label: 'Gt' },
    { value: 10e12, label: 'Mt' },
    { value: 10e9, label: 'kt' },
    { value: 10e6, label: 't' },
    { value: 10e3, label: 'kg' },
    { value: 1, label: 'g' },
]

export const displayMass = (mass: number): string => {
    return denominations
        .map(({value, label}) => {
            if (mass / value >= 1.0) {
                return (mass / value).toLocaleString(undefined, formatSpec) + label;
            }

            return null;
        })
        .find(it => it != null);
}
