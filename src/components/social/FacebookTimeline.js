import React from 'react';

const FacebookTimelineEmbed = () => {
  return (
    <div className='flex align-middle rounded-2xl overflow-hidden bg-white border p-2 my-2'>
      <iframe
        title='Facebook Timeline'
        src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fspacextechnologies%2F&tabs=timeline&width=550&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
        width='550'
        height='300'
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling='no'
        frameBorder='0'
        allowTransparency='true'
        allow='encrypted-media'
      ></iframe>
    </div>
  );
};

export default FacebookTimelineEmbed;
