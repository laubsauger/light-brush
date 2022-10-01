import styled, {keyframes} from "styled-components";

const slideKeyFrames = (strokeWidth:number, imageWidth:number) => keyframes`
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-${(imageWidth)}px, 0, 0);
    }
  `;

const SlideAnimation = styled('div')<{strokeWidth:number, imageWidth:number, duration:number}>`
    animation : ${props => slideKeyFrames(props.strokeWidth, props.imageWidth)} ${props => props.duration}s linear;
    animation-iteration-count: infinite;
  `;

export default SlideAnimation;