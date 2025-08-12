import isMobile from 'ismobilejs';

type Device = 'Mobile' | 'Server' | 'Browser';

const getDevice = (): Device => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    if (navigator?.product === 'ReactNative') {
      return 'Mobile';
    }

    const mobileDetect = isMobile(window.navigator ?? navigator);
    if (mobileDetect.any) {
      return 'Browser';
    }
    return 'Browser';
  }

  return 'Server';
};

export default getDevice;
