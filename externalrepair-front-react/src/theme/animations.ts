import { Animations } from '@platformbuilders/theme-toolkit';
import {
  LoadDotsAnimation,
  LoadingCircleAnimation,
  LoadingProgressAnimation,
} from '~/assets';

export default {
  circularLoading: LoadingCircleAnimation,
  contrastCircularLoading: LoadingCircleAnimation,
  buttonLoading: LoadDotsAnimation,
  contrastButtonLoading: LoadDotsAnimation,
  linearLoading: LoadingProgressAnimation,
  contrastLinearLoading: LoadingProgressAnimation,
} as Animations;
