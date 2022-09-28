import React from 'react';

import { FeaturedProducts, NewProductReleases, OtherProducts } from './index';

function Main() {
  return (
    <div id="guest-main">
      <div className="featured-albums-guest">{<FeaturedProducts />}</div>
      <div className="new-releases-guest">{<NewProductReleases />}</div>
      <div className="all-albums-guest">
        <OtherProducts />
      </div>
    </div>
  );
}

export default Main;
