import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimationState, CarnivalProps, DirectionState } from './types';
import { CarnivalArrow, CarnivalBar, CarnivalMarker, CarnivalWrapper, CarnivalZone } from './styles';

const getRandom = (max: number) => Math.floor(Math.random() * (Math.floor(max) + 1));

const Carnival = ({ onSuccess, onFailure, size, duration, random = false }: CarnivalProps) => {
	// Init component elements position and measures
	const barRef = useRef<HTMLInputElement>(null);
	const markerRef = useRef<HTMLInputElement>(null);
	const [zone, setZone] = useState({ width: 0, left: 0 });
	const barWidth = barRef.current?.offsetWidth || 0;
	const barHeight = barRef.current?.offsetHeight || 0;
	const zoneWidth = (barWidth * size) / 100;
	const zoneLeft = useMemo(
		() => (random ? getRandom(barWidth - zoneWidth) : (barWidth - zoneWidth) / 2),
		[random, barWidth, zoneWidth]
	); // Place 'success Zone' in the middle if random is false
	useEffect(() => {
		setZone({
			width: zoneWidth,
			left: zoneLeft,
		});
	}, [barRef, zoneWidth, zoneLeft]);

	// Controls the direction of the marker
	const [direction, setDirection] = useState<DirectionState>('right');
	const setMarkerDirection = (percentage: number) => {
		if (percentage >= 100) {
			setDirection('left');
		}
		if (percentage <= 0) {
			setDirection('right');
		}
	};

	// Controls for the animation
	const [animation, setAnimation] = useState<AnimationState>('running');
	const onMouseDown = () => {
		setAnimation('paused');
		checkResult();
	};
	const onMouseUp = () => {
		setAnimation('running');
	};

	// The animation ifself
	const [posX, setPosX] = useState(0);
	const requestRef = useRef(0);
	const previousTimeRef = useRef(0);
	const animate = useCallback(
		(time: number) => {
			if (animation === 'running') {
				const delta = time - previousTimeRef.current;
				const step = (delta * 100) / duration;
				const multiplier = direction === 'right' ? 1 : -1;
				const newPosition = (position: number) => {
					const nextPosition = position + step * multiplier;
					let roundedPosition = Math.round(nextPosition * 100) / 100;
					if (roundedPosition > 100) {
						roundedPosition = 100;
					}
					if (roundedPosition < 0) {
						roundedPosition = 0;
					}

					setMarkerDirection(roundedPosition);
					return roundedPosition;
				};
				setPosX(newPosition);
			}
			previousTimeRef.current = time;
			requestRef.current = requestAnimationFrame(animate);
		},
		[animation, direction, duration]
	);
	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}, [animate]);

	// Output
	const checkResult = () => {
		const markerX = markerRef.current?.offsetLeft || 0;
		const startX = zone.left;
		const endX = zone.left + zone.width;
		if (markerX >= startX && markerX <= endX) {
			onSuccess();
		} else {
			onFailure();
		}
	};

	return (
		<CarnivalWrapper data-testid='carnival' onMouseDownCapture={onMouseDown} onMouseUpCapture={onMouseUp}>
			<CarnivalBar ref={barRef}></CarnivalBar>
			<CarnivalZone
				data-testid='zone'
				$width={`${zone.width}px`}
				$left={`${zone.left}px`}
			></CarnivalZone>
			<CarnivalMarker data-testid='marker' ref={markerRef} style={{ left: `${posX}%` }}>
				<CarnivalArrow $height={`${barHeight / 2}px`} />
			</CarnivalMarker>
		</CarnivalWrapper>
	);
};

export default Carnival;
