import dayjs from "dayjs";

import { getCountryName } from "../../utilities/getIsoTo";
import CountryFlag from "../../utilities/CountryFlag";

function ReleasesTab({ dates }) {
  const groupedData =
    dates &&
    dates?.reduce((acc, { iso_3166_1, release_dates }) => {
      release_dates.forEach(({ release_date, certification, note }) => {
        const releaseDateKey = release_date;
        if (!acc[releaseDateKey]) {
          acc[releaseDateKey] = [];
        }
        acc[releaseDateKey].push({
          iso_3166_1,
          certification,
          note,
        });
      });
      return acc;
    }, {});

  const result =
    groupedData &&
    Object.entries(groupedData)
      .sort(
        ([releaseDateA], [releaseDateB]) =>
          new Date(releaseDateA) - new Date(releaseDateB),
      )
      .map(([release_date, countries]) => ({
        release_date,
        countries,
      }));
  return (
    <ul className="divide-grey-primary/45 text-grey-primary-light divide-y-1 text-xs">
      <li className="text-grey-primary flex py-1.5 tracking-wider">PREMIERE</li>
      {result?.map(({ release_date, countries }) => {
        return (
          <li
            key={release_date}
            className="grid grid-cols-7 justify-start gap-3 py-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8"
          >
            <div className="col-span-2 sm:col-span-1">
              {dayjs(release_date).format("DD MMM YYYY")}
            </div>
            <div className="col-span-5 flex flex-wrap gap-x-2 gap-y-2 sm:col-span-4 md:col-span-5 lg:col-span-7">
              {countries.map((country, i) => (
                <div key={country.iso_3166_1}>
                  <div className="flex flex-wrap items-center">
                    <CountryFlag countryCode={country.iso_3166_1} />
                    <span className="-ml-0.5">
                      {getCountryName(country.iso_3166_1)}
                    </span>
                    {country.certification && (
                      <div className="border-grey-primary/45 ml-1 rounded-sm border-1 px-1 text-xs">
                        {country.certification}
                      </div>
                    )}
                    <span className="text-grey-primary ml-1.5 font-medium">
                      {country.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ReleasesTab;
