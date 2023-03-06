import { v2 } from 'cloudinary';
export const CLOUDINARY = 'Cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dndimul42',
      api_key: '759871435364213',
      api_secret: 'zenQ80Ok4pMxb_TpI3f67sp4i-I',
    });
  },
};
