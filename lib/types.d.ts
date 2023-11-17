import * as react_jsx_runtime from 'react/jsx-runtime';

type CarnivalProps = {
    onSuccess: () => void;
    onFailure: () => void;
    size: number;
    duration: number;
    random?: boolean;
};
type AnimationState = 'running' | 'paused';
type DirectionState = 'left' | 'right';

declare const Carnival: ({ onSuccess, onFailure, size, duration, random }: CarnivalProps) => react_jsx_runtime.JSX.Element;

export { type AnimationState, Carnival, type CarnivalProps, type DirectionState };
