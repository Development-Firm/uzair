import BackInsideIcon from '@/Icons/BackInsideIcon';
import BackOutsideIcon from '@/Icons/BackOutsideIcon';
import BottomInsideIcon from '@/Icons/BottomInsideIcon';
import BottomOutsideIcon from '@/Icons/BottomOutsideIcon';
import FrontInsideIcon from '@/Icons/FrontInsideIcon';
import FrontOutsideIcon from '@/Icons/FrontOutsideIcon';
import LeftOutsideIcon from '@/Icons/LeftOutsideIcon';
import RightOutsideIcon from '@/Icons/RightOutsideIcon';
import TopInsideIcon from '@/Icons/TopInsideIcon';
import TopOutsideIcon from '@/Icons/TopOutsideIcon';

// DIMENSIONS object with structure
const DIMENSIONS = {
  "flat-box": {
    outside: {
      top: { width: 600, height: 400 },
      bottom: { width: 600, height: 400 },
      right: { width: 300, height: 100 },
      left: { width: 300, height: 100 },
      front: { width: 400, height: 100 },
      back: { width: 400, height: 100 }
    },
    inside: {
      top: { width: 400, height: 100 },
      bottom: { width: 600, height: 400 },
      front: { width: 400, height: 100 },
      back: { width: 600, height: 400 },
      right: { width: 300, height: 100 },
      left: { width: 300, height: 100 }
    }
  }
};

// BOX_FACES object with structure
const BOX_FACES = {
  "flat-box": {
    outsideFaces: [
      { label: 'Outside Bottom', icon: BottomOutsideIcon, faceKey: 'outside_bottom' },
      { label: 'Outside Top', icon: TopOutsideIcon, faceKey: 'outside_top' },
      { label: 'Outside Left', icon: LeftOutsideIcon, faceKey: 'outside_left' },
      { label: 'Outside Right', icon: RightOutsideIcon, faceKey: 'outside_right' },
      { label: 'Outside Front', icon: FrontOutsideIcon, faceKey: 'outside_front' },
      { label: 'Outside Back', icon: BackOutsideIcon, faceKey: 'outside_back' }
    ],
    insideFaces: [
      { label: 'Inside Top', icon: TopInsideIcon, faceKey: 'inside_top' },
      { label: 'Inside Bottom', icon: BottomInsideIcon, faceKey: 'inside_bottom' },
      { label: 'Inside Back', icon: BackInsideIcon, faceKey: 'inside_back' },
      { label: 'Inside Front', icon: FrontInsideIcon, faceKey: 'inside_front' }
    ]
  },
  none: {
    outsideFaces: [
      { label: 'Outside Bottom', icon: BottomOutsideIcon, faceKey: 'outside_bottom' },
      { label: 'Outside Top', icon: TopOutsideIcon, faceKey: 'outside_top' },
      { label: 'Outside Left', icon: LeftOutsideIcon, faceKey: 'outside_left' },
      { label: 'Outside Right', icon: RightOutsideIcon, faceKey: 'outside_right' },
      { label: 'Outside Front', icon: FrontOutsideIcon, faceKey: 'outside_front' },
      { label: 'Outside Back', icon: BackOutsideIcon, faceKey: 'outside_back' }
    ],
    insideFaces: [
      { label: 'Inside Top', icon: TopInsideIcon, faceKey: 'inside_top' },
      { label: 'Inside Bottom', icon: BottomInsideIcon, faceKey: 'inside_bottom' },
      { label: 'Inside Back', icon: BackInsideIcon, faceKey: 'inside_back' },
      { label: 'Inside Front', icon: FrontInsideIcon, faceKey: 'inside_front' }
    ]
  }
};

export {
  DIMENSIONS,
  BOX_FACES
};
