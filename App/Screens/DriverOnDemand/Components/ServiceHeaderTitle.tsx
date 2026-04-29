import { constantData } from '../../../Common/constant';
import { ServiceTypes } from '../../../Store/Slices/LocationSlice';

export const getHeaderTitle = (serviceType: ServiceTypes): string => {
  switch (serviceType) {
    case constantData.rideType.single:
      return 'One Way';

    case constantData.rideType.twoWay:
      return 'Round Trip';

    case constantData.rideType.outStation:
      return 'Outstation';

    default:
      return 'Service';
  }
};
