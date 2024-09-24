class DAPConfig {
  agency;
  subagency;
  sitetopic;
  siteplatform;
  autotracker;
  cto;

  constructor(agency) {
    this.agency = agency;
  }

  toQueryParams() {
    const configuredFields = Object.entries(this).filter(entry => entry[1] !== undefined);
    return new URLSearchParams(configuredFields).toString();
  }
}

export default DAPConfig;