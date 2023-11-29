import React, { useState } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import BFLoading from '../small/BFLoading';

export default function TwitterEmbed() {
  const [isLoading, setLoading] = useState(true);

  const onLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      {isLoading && (
        <div className="h-96 bg-white">
          <BFLoading heightAdjust="h-[45vh]" />
        </div>
      )}
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        tweetLimit="5"
        noScrollbar
        options={{ height: 300 }}
        onLoad={onLoad}
      />
    </div>
  );
}
