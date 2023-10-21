import styled from 'styled-components';

export const CarnivalWrapper = styled.section`
	position: relative;
	height: 100%;
	width: 100%;
	background-color: transparent;
	border: 0;
	margin: 0;
	padding: 0;
	pointer-events: all;
	cursor: pointer;
`;

export const Bar = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	background-color: orange;
	pointer-events: none;
`;

export const Zone = styled.div<{
	$width?: string;
	$left?: string;
}>`
	position: absolute;
	height: 100%;
	width: ${({ $width }) => $width};
	left: ${({ $left }) => $left};
	top: 0;
	background-color: green;
	z-index: 1;
	pointer-events: none;
`;

export const Marker = styled.div`
	position: relative;
	background-color: black;
	top: 0;
	left: 0;
	height: 100%;
	width: 1px;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	z-index: 2;
	pointer-events: none;
`;

export const Arrow = styled.div<{
	$height: string;
}>`
	position: absolute;
	width: 0px;
	height: 0px;
	border-style: solid;
	border-width: ${({ $height }) => $height} 10px 0 10px;
	border-color: black transparent transparent transparent;
	transform: rotate(0deg) translateX(-50%) translateY(0%);
`;
