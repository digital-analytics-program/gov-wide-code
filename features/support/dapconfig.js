class DAPConfig {
  agency;
  subagency;
  sitetopic;
  siteplatform;
  autotracker;
  yt;
  cto;
  pga4;
  parallelcd;
  sp;

  constructor(agency) {
    this.agency = agency;
  }

  toQueryParams() {
    const configuredFields = Object.entries(this).filter(entry => entry[1] !== undefined);
    return new URLSearchParams(configuredFields).toString();
  }
}

export default DAPConfig;