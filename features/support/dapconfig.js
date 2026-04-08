/**
 * Represents all the ways a DAP-enabled page can alter DAP's configuration at load-time via query params in the DAP script tag.
 */
class DAPConfig {
  agency;
  subagency;
  sitetopic;
  siteplatform;
  sp;
  yt;
  pga4;
  parallelcd;
  autotracker;
  cto;

  /**
   * At minimum, DAPConfig requires an agency to be specified. Other fields can be set as needed after instantiation.
   * @param agency
   */
  constructor(agency) {
    this.agency = agency;
  }

  /**
   * Converts the configured fields of this DAPConfig instance into a query parameter string that can be appended to the DAP script URL.
   * @returns {string} the query param string
   */
  toQueryParams() {
    const configuredFields = Object.entries(this).filter(entry => entry[1] !== undefined);
    return new URLSearchParams(configuredFields).toString();
  }
}

export default DAPConfig;