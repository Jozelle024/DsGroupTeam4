var Address_Components = {
    long_name: "277",
    short_name: "277",
    types: ["street_number"]
}

var Result = {
    address_components: Address_Components
}

var Location = {
    lat: 40.714232,
    lng: -73.9612889
}

var Northeast = {
    lat: 40.7155809802915,
    lng: -73.9599399197085
}

var Southwest = {
    lat: 40.7128830197085,
    lng: -73.96263788029151
}

var Viewport = {
    northeast: Northeast,
    southwest: Southwest
}

var Geometry = {
    location: Location,
    location_type: "ROOFTOP",
    viewport: Viewport
}

var CoordinateHumanReadable = {
    result: Result[8],
    formatted_address: "277 Belford Avenue, Brooklyn, NY 11211, USA",
    geometry: Geometry,
    place_id: "ChIJd8BlQ2BZwokRAFUEcm_qrcA",
    types : [ "street_address" ]
}