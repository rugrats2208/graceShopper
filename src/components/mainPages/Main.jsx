import React from 'react';

import { FeaturedProducts, NewProductReleases, AllProducts } from '..';

function GuestMain() {
  return (
    <div id="guest-main">
      <div className="featured-albums-guest">{<FeaturedProducts />}</div>
      <div className="new-releases-guest">{<NewProductReleases />}</div>
      <div className="all-albums-guest">
        <AllProducts />
      </div>
    </div>
  );
}

export default GuestMain;
