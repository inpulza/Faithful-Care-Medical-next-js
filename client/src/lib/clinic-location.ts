/**
 * Verified Google Maps profile of Faithful Care Medical Services.
 *
 * Sources of truth (provided by the clinic owner):
 *   - Share URL (resolves to the exact place card):
 *     https://maps.app.goo.gl/wfopfjr5d1Yrksqv9
 *   - Canonical place URL (with place_id encoded in the data parameter):
 *     https://www.google.com/maps/place/Faithful+Care+Medical+Services/@26.2617577,-81.8017368,...
 *   - place_id (hex/CID form): 0x88db1ff2a8a2eaa7:0x842c66a33d23b65d
 *
 * Why we use the SHARE URL for outbound links:
 *   The building at 9955 Tamiami Trail N hosts multiple clinics
 *   (Goodwin Medical Center is at Suite 4, Faithful Care is at Suite 2).
 *   Lat/lng or plain address links can be reverse-geocoded by Google Maps
 *   to the wrong POI. The official share URL carries the place_id and is
 *   guaranteed by Google to land on Faithful Care's pin.
 */

export const CLINIC_LATITUDE = 26.2617577;
export const CLINIC_LONGITUDE = -81.8017368;

export const CLINIC_STREET = "9955 Tamiami Trail N. Suite 2";
export const CLINIC_CITY = "Naples";
export const CLINIC_STATE = "FL";
export const CLINIC_ZIP = "34108";
export const CLINIC_FULL_ADDRESS = `${CLINIC_STREET}, ${CLINIC_CITY}, ${CLINIC_STATE} ${CLINIC_ZIP}`;

/**
 * Official Google share URL. Use this for outbound user-facing links
 * ("View on Google Maps", "Get directions", etc). Always lands on the
 * exact Faithful Care pin, never the building or a neighbor clinic.
 *
 * On mobile, this opens the Google Maps app directly to the place card,
 * where the prominent blue "Directions" button is one tap away.
 */
export const CLINIC_GMAPS_SHARE_URL = "https://maps.app.goo.gl/wfopfjr5d1Yrksqv9";

/**
 * Canonical place URL with place_id baked into the URL data parameter.
 * Reserved for SEO / structured data fields (sameAs, hasMap) where a
 * stable, fully qualified URL is preferred over a Google-shortened link.
 */
export const CLINIC_GMAPS_PLACE_URL =
  "https://www.google.com/maps/place/Faithful+Care+Medical+Services/@26.2617577,-81.8017368,17z/data=!3m1!4b1!4m6!3m5!1s0x88db1ff2a8a2eaa7:0x842c66a33d23b65d!8m2!3d26.2617577!4d-81.8017368!16s%2Fg%2F11n9pz9k2v";

/**
 * URL the "Directions" button (mobile floating bar, etc.) opens.
 * Uses the official share URL so Maps lands on Faithful Care's pin
 * for sure; user then taps the built-in "Directions" button.
 */
export const CLINIC_GMAPS_DIRECTIONS_URL = CLINIC_GMAPS_SHARE_URL;

/**
 * Embed URL for the iframe map on the contact / NAP block.
 * Encodes the place_id so the embedded map shows the clinic's pin.
 */
export const CLINIC_GMAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.9970946839653!2d-81.8017368!3d26.261757699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db1ff2a8a2eaa7%3A0x842c66a33d23b65d!2sFaithful%20Care%20Medical%20Services!5e0!3m2!1sen!2sus!4v1773856321793!5m2!1sen!2sus";
