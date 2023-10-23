import * as react_jsx_runtime from 'react/jsx-runtime';

type CarnivalProps = {
    onSuccess: () => void;
    onFailure: () => void;
    size: number;
    duration: number;
    random?: boolean;
};

declare const Carnival: ({ onSuccess, onFailure, size, duration, random }: CarnivalProps) => react_jsx_runtime.JSX.Element;

export { Carnival };
