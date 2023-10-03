function MainModule(listingsID = "#listings") {
  const me = {};
  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing, index) {
    return `
      <div class="col-4">
        <div class="listing card">
          <img src=${listing.picture_url} class="card-img-top" alt="AirBNB Listing" />
          <div class="card-body">
            <h2 class="card-title">${listing.name}</h2>
            <div>${listing.price}</div>
            
            <!-- Tab navigation -->
            <ul class="nav nav-tabs" id="cardTab${index}" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="host-tab${index}" data-bs-toggle="tab" href="#host${index}" role="tab" aria-controls="host" aria-selected="true">Host</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="desc-tab${index}" data-bs-toggle="tab" href="#description${index}" role="tab" aria-controls="description" aria-selected="false">Description</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="amen-tab${index}" data-bs-toggle="tab" href="#amenities${index}" role="tab" aria-controls="amenities" aria-selected="false">Amenities</a>
              </li>
            </ul>
            
            <!-- Tab content -->
            <div class="tab-content" id="cardTabContent${index}">
              <div class="tab-pane fade show active" id="host${index}" role="tabpanel" aria-labelledby="host-tab${index}">
                <h4>Host Information</h4>
                <img src=${listing.host_thumbnail_url} />
                <p>${listing.host_name}</p>
              </div>
              <div class="tab-pane fade" id="description${index}" role="tabpanel" aria-labelledby="desc-tab${index}">
                <h4>Listing Description</h4>
                <p>${listing.description}</p>
              </div>
              <div class="tab-pane fade" id="amenities${index}" role="tabpanel" aria-labelledby="amen-tab${index}">
                <h4>Amenities</h4>
                <p>${listing.amenities}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }
  

  function redraw(listings) {
    listingsElement.innerHTML = "";
    listingsElement.innerHTML = listings.map((listing, index) => getListingCode(listing, index)).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();
    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;
  return me;
}

const main = MainModule();
main.loadData();
