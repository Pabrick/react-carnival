export type CarnivalProps = {
    onSuccess: () => void;
    onFailure: () => void;
    size: number;
    duration: number;
    random?: boolean;
};
export type AnimationState = 'running' | 'paused';
export type DirectionState = 'left' | 'right';
