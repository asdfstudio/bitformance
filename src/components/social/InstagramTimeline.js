import { InstagramEmbed } from 'react-social-media-embed'

const InstagramTimeline = () => {
  return (
    <div className='flex align-middle rounded-2xl overflow-hidden bg-white border p-2 my-2'>
      <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={'100%'} />
    </div>
  );
};

export default InstagramTimeline;
